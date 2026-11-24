import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {extname,join,normalize} from "node:path";
import {fileURLToPath} from "node:url";
const root=fileURLToPath(new URL(".",import.meta.url));
const port=Number.parseInt(process.env.PORT||"4173",10);
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".svg":"image/svg+xml"};
if(!Number.isInteger(port)||port<1||port>65535)throw new Error("PORT harus berada pada rentang 1–65535.");
createServer(async(req,res)=>{try{const url=new URL(req.url||"/","http://localhost");const raw=url.pathname==="/index.html"?"index.html":url.pathname==="/"?"index.html":decodeURIComponent(url.pathname.slice(1));const safe=normalize(raw).replace(/^(\.\.(\/|\\|$))+/,"");const target=join(root,safe);const info=await stat(target);if(!target.startsWith(root)||!info.isFile())throw new Error();res.writeHead(200,{"Content-Type":types[extname(target)]||"application/octet-stream","Cache-Control":"no-store"});res.end(await readFile(target));}catch{res.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"});res.end("Berkas tidak ditemukan.");}}).listen(port,"127.0.0.1",()=>console.log("BuktiUji aktif di http://127.0.0.1:"+port));
