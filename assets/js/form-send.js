/* J58 form delivery. All website forms send through here.
   1) If ENDPOINT is set (Google Apps Script web app URL), the message is delivered to social@j58.eu and logged in a Google Sheet.
   2) If ENDPOINT is empty, or sending fails, the visitor's email app opens with the message ready, addressed to social@j58.eu. */
(function(){
var J=window.J58Form=window.J58Form||{};
J.ENDPOINT="https://script.google.com/macros/s/AKfycbx0h1fUppWTwHEouQP-wj3Q2WX3bDgacauDAvpYxnPNzpqI_52lO-KIcOKAYG0yalyb/exec";               /* paste the Apps Script web app URL here */
J.TO="social@j58.eu";
var LANG=(document.documentElement.lang||'en').slice(0,2);
J.L={
 en:{mail:"One more step: your email app should now open with your message ready. Please press Send there to deliver it. Nothing is sent until you do. If nothing opened, write to "+J.TO+".",ok:"Thank you! We have received your request and will get back to you soon.",sending:"Sending…"},
 de:{mail:"Noch ein Schritt: Ihre E-Mail-App sollte sich jetzt mit Ihrer Nachricht öffnen. Bitte klicken Sie dort auf Senden. Erst dann wird die Nachricht verschickt. Falls sich nichts öffnet, schreiben Sie an "+J.TO+".",ok:"Vielen Dank! Wir haben Ihre Anfrage erhalten und melden uns bald bei Ihnen.",sending:"Wird gesendet…"},
 nl:{mail:"Nog één stap: uw e-mailapp opent nu met uw bericht klaar. Druk daar op Verzenden om het te versturen. Er wordt niets verstuurd voordat u dat doet. Opent er niets, schrijf dan naar "+J.TO+".",ok:"Bedankt! We hebben uw aanvraag ontvangen en nemen snel contact met u op.",sending:"Verzenden…"}
};
J.t=J.L[LANG]||J.L.en;
J.mailMsg=J.t.mail;
J.send=function(o){
  var d=o.data||{};
  function viaMail(){
    window.location.href='mailto:'+J.TO+'?subject='+encodeURIComponent(o.subject||('['+o.form+']'))+'&body='+encodeURIComponent(o.text||'');
    return new Promise(function(res){setTimeout(function(){res('mailto')},600)});
  }
  if(!J.ENDPOINT)return viaMail();
  var payload=JSON.stringify({form:o.form,subject:o.subject,page:location.href,lang:(document.documentElement.lang||'en'),text:o.text,fields:d});
  var ctl=window.AbortController?new AbortController():null,t=setTimeout(function(){if(ctl)ctl.abort()},15000);
  return fetch(J.ENDPOINT,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:payload,signal:ctl?ctl.signal:undefined})
    .then(function(r){clearTimeout(t);return r.json()})
    .then(function(j){if(!j||!j.ok)throw 0;return 'sent'})
    .catch(function(){clearTimeout(t);return viaMail()});
};
/* Simple forms: <form data-send> (brochure, intake, newsletter) */
function label(el,f){
  var l=el.getAttribute('aria-label');if(l)return l;
  if(el.id){var lb=f.querySelector('label[for="'+el.id+'"]');if(lb)return lb.textContent.replace('*','').trim()}
  return (el.getAttribute('placeholder')||el.name).replace('*','').trim();
}
document.querySelectorAll('form[data-send]').forEach(function(f){
  var name=f.getAttribute('data-send')||f.getAttribute('aria-label')||'Website form';
  var hp=document.createElement('input');hp.type='text';hp.name='company_website';hp.tabIndex=-1;hp.autocomplete='off';hp.setAttribute('aria-hidden','true');hp.style.cssText='position:absolute;left:-9999px;width:1px;height:1px;opacity:0';f.appendChild(hp);
  var btn=f.querySelector('button[type=submit]'),ok=f.querySelector('.fm-ok,.form-success');
  f.addEventListener('submit',function(e){
    e.preventDefault();if(hp.value)return;
    var lines=[],data={};
    f.querySelectorAll('input,select,textarea').forEach(function(el){
      if(el===hp||el.type==='hidden'||el.type==='submit'||el.disabled)return;
      if(el.type==='radio'&&!el.checked)return;
      if(el.type==='checkbox'){lines.push('Consent: '+(el.checked?'yes':'no'));data[el.name||'consent']=el.checked;return}
      var v=(el.value||'').trim();if(!v)return;
      lines.push(label(el,f)+': '+v);data[el.name||label(el,f)]=v;
    });
    var who=((data.first||'')+' '+(data.last||'')).trim()||data.nlname||data.nlemail||data.email||'';
    var text='Form: '+name+'\nPage: '+location.href+'\nPage language: '+(document.documentElement.lang||'en').toUpperCase()+'\n\n'+lines.join('\n');
    var orig=btn?btn.textContent:'';if(btn){btn.disabled=true;btn.textContent=J.t.sending}
    J.send({form:name,subject:'['+name+'] '+who,text:text,data:data}).then(function(r){
      if(btn){btn.disabled=false;btn.textContent=orig}
      if(ok){ok.textContent=(r==='sent')?J.t.ok:J.mailMsg;ok.hidden=false;ok.focus()}
      if(r==='sent'){f.reset();f.querySelectorAll('input,select,textarea,button').forEach(function(el){if(el.type!=='hidden')el.setAttribute('disabled','true')})}
    });
  });
});
})();
