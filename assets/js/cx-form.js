/* Generic J58 form handler for .cx forms (validation, mailto fallback, success panel). Config: data-subject, data-sendlabel on the form. */
(function(){
var f=document.querySelector('form.cx[data-generic]');if(!f)return;
var ENDPOINT="";/* e.g. Formspree / HubSpot endpoint. While empty, the visitor's email app opens, addressed to info@j58.eu. */
var TO="info@j58.eu",body=document.getElementById('cxBody'),ok=document.getElementById('cxOk'),btn=document.getElementById('cxSubmit'),msg=f.querySelector('textarea'),cnt=document.getElementById('cxCount');
if(msg&&cnt)msg.addEventListener('input',function(){cnt.textContent=msg.value.length+' / '+(msg.maxLength>0?msg.maxLength:1500)});
function bad(el,on){var w=el.closest('.cx-f');if(w)w.classList.toggle('bad',on)}
function check(){var okAll=true,first=null;
f.querySelectorAll('.cx-f input[required],.cx-f select[required],.cx-f textarea[required]').forEach(function(el){var v=el.value.trim(),good=!!v;if(el.type==='email')good=/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v);bad(el,!good);if(!good){okAll=false;first=first||el}});
var fs=f.querySelector('.cx-fs');if(fs){var t=f.querySelector('input[name=topic]:checked');fs.classList.toggle('bad',!t);if(!t){okAll=false;first=first||fs.querySelector('input')}}
var c=f.elements.consent,ce=f.querySelector('[data-for=consent]');ce.classList.toggle('show',!c.checked);if(!c.checked){okAll=false;first=first||c}
if(first)first.focus();return okAll}
f.addEventListener('input',function(e){if(e.target.closest('.cx-f'))bad(e.target,false)});
f.addEventListener('change',function(e){if(e.target.name==='topic'){var fs=f.querySelector('.cx-fs');if(fs)fs.classList.remove('bad')}if(e.target.name==='consent')f.querySelector('[data-for=consent]').classList.remove('show')});
f.addEventListener('submit',function(e){e.preventDefault();if(f.elements.company_website&&f.elements.company_website.value)return;if(!check())return;
var d={};new FormData(f).forEach(function(v,k){d[k]=v});
var lines=[];f.querySelectorAll('.cx-f').forEach(function(w){var el=w.querySelector('input:not([type=checkbox]),select,textarea');if(!el||!el.name||el.name==='dial')return;var lab=w.querySelector('label');var name=lab?lab.textContent.replace('*','').trim():el.name;var v=el.value.trim();if(el.name==='phone')v=((f.elements.dial&&f.elements.dial.value)||'')+' '+v;lines.push(name+': '+v)});
var fname=f.getAttribute('data-subject')||'Website form',text='Form: '+fname+'\nPage language: '+(document.documentElement.lang||'en').toUpperCase()+'\n'+(d.topic?'Type: '+d.topic+'\n':'')+lines.join('\n');
function done(m){body.hidden=true;ok.hidden=false;if(m)document.getElementById('cxOkMsg').textContent=m;ok.focus();ok.scrollIntoView({behavior:'smooth',block:'center'})}
var lab=btn.firstElementChild,orig=lab.textContent;btn.disabled=true;lab.textContent='Sending…';
var subj='['+fname+'] '+(d.topic||'');
if(ENDPOINT){fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)}).then(function(r){if(!r.ok)throw 0;done()}).catch(function(){btn.disabled=false;lab.textContent=orig;alert('Sorry, sending failed. Please email us at '+TO+'.')})}
else{window.location.href='mailto:'+TO+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(text);setTimeout(function(){done('Your email app should now open with your details ready to send. If it didn’t, please write to '+TO+'.');btn.disabled=false;lab.textContent=orig},600)}});
var again=document.getElementById('cxAgain');if(again)again.addEventListener('click',function(){f.reset();if(cnt)cnt.textContent='0 / 1500';ok.hidden=true;body.hidden=false});
})();
