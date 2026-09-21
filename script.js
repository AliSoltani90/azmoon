const questions=[
{q:"عدد بعدی را پیدا کن: 2 ، 6 ، 12 ، 20 ، 30 ، ؟",o:["36","40","42","44"],a:2,e:"اختلاف‌ها به‌ترتیب ۴، ۶، ۸ و ۱۰ هستند؛ پس اختلاف بعدی ۱۲ است. بنابراین ۳۰ + ۱۲ = ۴۲."},
{q:"اگر همه‌ی «رُما»ها «تیز» باشند و هیچ «تیزی» «آبی» نباشد، کدام نتیجه حتماً درست است؟",o:["بعضی رُماها آبی‌اند.","هیچ رُمایی آبی نیست.","همه‌ی آبی‌ها رُما هستند.","بعضی تیزها رُما نیستند."],a:1,e:"هر رُما زیرمجموعه‌ی تیزهاست و هیچ تیزی آبی نیست؛ بنابراین هیچ رُمایی نمی‌تواند آبی باشد."},
{q:"سه عدد داریم که مجموعشان ۳۰ است. عدد دوم دو برابر عدد اول و عدد سوم سه برابر عدد اول است. عدد دوم چند است؟",o:["۵","۱۰","۱۲","۱۵"],a:1,e:"اگر عدد اول x باشد، سه عدد x، 2x و 3x هستند. پس 6x=30 و x=5؛ بنابراین عدد دوم ۱۰ است."},
{q:"اگر ▲ + ▲ = 18 و ▲ + ● = 13 باشد، مقدار ● چند است؟",o:["۴","۵","۶","۷"],a:0,e:"از 2▲=18 داریم ▲=9. سپس 9+●=13، پس ●=4. بنابراین پاسخ صحیح گزینه اول است."},
{q:"کدام گزینه با بقیه متفاوت است؟",o:["۱۶","۲۵","۳۶","۴۸"],a:3,e:"۱۶، ۲۵ و ۳۶ مربع کامل هستند (۴²، ۵² و ۶²)، اما ۴۸ مربع کامل نیست."},
{q:"یک ساعت ۳ دقیقه عقب است. اگر ساعت واقعی ۱۰:۲۰ باشد، ساعت چه زمانی را نشان می‌دهد؟",o:["۱۰:۱۷","۱۰:۲۳","۱۰:۱۸","۱۰:۲۰"],a:0,e:"ساعت ۳ دقیقه عقب است؛ بنابراین از زمان واقعی ۳ دقیقه کم می‌کنیم: ۱۰:۲۰ − ۳ دقیقه = ۱۰:۱۷."},
{q:"الگوی زیر را ادامه بده: AB ، DE ، GH ، JK ، ؟",o:["LM","MN","NO","OP"],a:1,e:"حروف به جفت‌های متوالی تقسیم شده‌اند و هر جفت سه حرف بعد از جفت قبلی شروع می‌شود: AB، DE، GH، JK، MN."},
{q:"علی از رضا بلندتر است. رضا از سارا بلندتر است. سارا از مهدی بلندتر است. ترتیب افراد از بلندترین به کوتاه‌ترین کدام است؟",o:["علی، سارا، رضا، مهدی","علی، رضا، سارا، مهدی","سارا، علی، رضا، مهدی","علی، سارا، مهدی، رضا"],a:1,e:"روابط به صورت علی > رضا > سارا > مهدی هستند؛ بنابراین ترتیب از بلندترین به کوتاه‌ترین، علی، رضا، سارا و مهدی است."}
];

let current=0,answers=Array(questions.length).fill(null),remaining=600,timerId=null,submitted=false;
const $=id=>document.getElementById(id);
const letters=["الف","ب","ج","د"];

function render(){
 const x=questions[current];
 $("questionCounter").textContent=`سؤال ${current+1} از ${questions.length}`;
 $("answeredCounter").textContent=`پاسخ داده‌شده: ${answers.filter(v=>v!==null).length}`;
 $("progressBar").style.width=((current+1)/questions.length*100)+"%";
 $("questionNumber").textContent=`سؤال ${current+1}`;
 $("questionText").textContent=x.q;
 $("options").innerHTML=x.o.map((v,i)=>`<div class="option ${answers[current]===i?"selected":""}" data-i="${i}"><span class="letter">${letters[i]}</span><span>${v}</span></div>`).join("");
 document.querySelectorAll(".option").forEach(el=>el.onclick=()=>{answers[current]=+el.dataset.i;render();});
 $("prevBtn").disabled=current===0;
 $("nextBtn").textContent=current===questions.length-1?"ثبت آزمون":"بعدی";
 $("questionNav").innerHTML=questions.map((_,i)=>`<button class="qbtn ${i===current?"active":""} ${answers[i]!==null?"answered":""}" data-q="${i}">${i+1}</button>`).join("");
 document.querySelectorAll(".qbtn").forEach(b=>b.onclick=()=>{current=+b.dataset.q;render();});
}
function start(){
 $("startScreen").classList.add("hidden");$("quizScreen").classList.remove("hidden");
 timerId=setInterval(()=>{remaining--;updateTimer();if(remaining<=0)finish();},1000);
 updateTimer();render();
}
function updateTimer(){let m=Math.floor(remaining/60),s=remaining%60;$("timer").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;}
function finish(){
 if(submitted)return; submitted=true; clearInterval(timerId);
 const correct=answers.reduce((n,a,i)=>n+(a===questions[i].a?1:0),0);
 const blank=answers.filter(a=>a===null).length,wrong=questions.length-correct-blank,percent=Math.round(correct/questions.length*100);
 $("quizScreen").classList.add("hidden");$("resultScreen").classList.remove("hidden");
 $("score").textContent=`${correct} از ${questions.length}`;
 $("correct").textContent=correct;$("wrong").textContent=wrong;$("blank").textContent=blank;$("percent").textContent=percent+"٪";
 $("review").innerHTML=questions.map((x,i)=>{
   const ok=answers[i]===x.a;
   const state=answers[i]===null?"بدون پاسخ":ok?"صحیح":"غلط";
   return `<article class="reviewItem"><h3>سؤال ${i+1} — <span class="${ok?"correctText":"wrongText"}">${state}</span></h3>
   <div>${x.q}</div><p>پاسخ صحیح: <b>${letters[x.a]}) ${x.o[x.a]}</b></p>
   ${answers[i]!==null?`<p>پاسخ شما: <b>${letters[answers[i]]}) ${x.o[answers[i]]}</b></p>`:""}
   <div class="explain"><b>پاسخ تشریحی:</b><br>${x.e}</div></article>`;
 }).join("");
}
$("startBtn").onclick=start;
$("prevBtn").onclick=()=>{if(current>0){current--;render();}};
$("nextBtn").onclick=()=>{if(current<questions.length-1){current++;render();}else finish();};
$("finishBtn").onclick=finish;
$("reviewBtn").onclick=()=>$("review").scrollIntoView({behavior:"smooth"});
$("restartBtn").onclick=()=>location.reload();
updateTimer();