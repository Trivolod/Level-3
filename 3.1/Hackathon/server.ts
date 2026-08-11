import e from'express';import c from'cors';
const a=e();a.use(c(),e.json(),e.static('.'));
enum B{PLUS='PLUS',MINUS='MINUS'}
let h:any[]=[];
a.post('/click',(q,r)=>{
  if(q.body.button===B.PLUS||q.body.button===B.MINUS)h.push(q.body.button);
  r.json({plus:h.filter(x=>x===B.PLUS),minus:h.filter(x=>x===B.MINUS)});
});
a.listen(3000);