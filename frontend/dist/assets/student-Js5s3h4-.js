import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css               */const i="http://localhost:3000/api";let c=[];document.addEventListener("DOMContentLoaded",function(){if(!localStorage.getItem("jwtToken")){alert("您还未登录，请先登录"),window.location.href="login.html";return}fetch(`${i}/teachers`,{headers:{Authorization:localStorage.getItem("jwtToken")}}).then(o=>o.json()).then(o=>{if(o.length>0){const t=document.getElementById("teacher");o.forEach(n=>{const l=document.createElement("option");l.value=n.id,l.textContent=n.name,t.appendChild(l)})}else console.log(o),console.error("教师数据格式错误")}).catch(o=>{console.error("获取教师列表失败:",o)}),fetch(`${i}/evaluations/metrics`,{headers:{Authorization:localStorage.getItem("jwtToken")}}).then(o=>o.json()).then(o=>{if(o.length>0){const t=document.getElementById("evaluationForm");c=o,o.forEach(n=>{const l=m(n);t.innerHTML+=l})}else console.log(o),console.error("评价数据格式错误")}).catch(o=>{console.error("获取评价指标失败:",o)}).finally(()=>{document.getElementById("evaluationForm").appendChild(s('<button type="submit" class="button">提交评价</button>'))})});document.getElementById("evaluationForm").addEventListener("submit",function(e){e.preventDefault();const o=document.getElementById("evaluationForm");let t={teacherId:o.elements.teacher.value,formData:[],evaluations:c};if(!t.teacherId){alert("请选择教师");return}let n=[];for(let l=1;l<o.elements.length;l++){const r=o.elements[l];r.type==="text"||r.type==="select-one"||r.type==="radio"&&r.checked?t.formData.push(r.value):r.type==="checkbox"&&r.checked&&n.push(r.value)}n.length>0&&t.formData.push(n),fetch(`${i}/evaluations/results`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:localStorage.getItem("jwtToken")},body:JSON.stringify(t)}).then(l=>l.json()).then(()=>{alert("评价提交成功！"),document.getElementById("evaluationForm").reset()}).catch(l=>{console.error("提交评价失败:",l)})});document.getElementById("logout").addEventListener("click",function(){localStorage.removeItem("jwtToken"),window.location.href="login.html"});var s=function(e){var o=document.createElement("div");return o.innerHTML=e,o.firstChild};function m(e){if(e.name==="input")return`
        <div class="form-group">
            <label for="${e.id}" class="from-label">${e.title}</label>
            <input type="text" class="form-control" id="${e.id}" name="${e.name}" placeholder="${e.placeholder||""}" required>
        </div>`;if(e.name==="score"){if(e.options.length===0)return console.warn(`Score options for ${e.name} are empty.`),"";let o=e.options.map(t=>`<option value="${t}">${t}</option>`).join("");return`
        <div class="form-group">
            <label for="${e.id}" class="from-label">${e.title}</label>
            <select class="form-control" id="${e.id}" name="${e.name}" required>
                ${o}
            </select>
        </div>`}else if(e.name==="radio"){if(e.options.length===0)return console.warn(`Radio options for ${e.name} are empty.`),"";let o=e.options.map((t,n)=>`
        <input class="form-check-input" type="radio" name="${e.name}" id="${e.id}-${n+1}" value="${t}" required>
        <label class="form-check-label" for="${e.id}-${n+1}">${t}</label>`).join("");return`
        <div class="form-group flex-box">
            <label class="from-label">${e.title}</label>
            <div class="form-check flex-box form-single">
                ${o}
            </div>
        </div>`}else if(e.name==="checkbox"){if(e.options.length===0)return console.warn(`Checkbox options for ${e.name} are empty.`),"";let o=e.options.map((t,n)=>`
        <input class="form-check-input checkbox-input-${e.id}" type="checkbox" name="${e.name}" id="${e.id}-${n+1}" value="${t}" onclick='deRequire("checkbox-input-${e.id}")' required>
        <label class="form-check-label" for="${e.id}-${n+1}">${t}</label>`).join("");return`
    <div class="form-group flex-box">
        <label class="from-label">${e.title}</label>
        <div class="form-check flex-box form-single">
            ${o}
        </div>
    </div>`}else return""}function a(e){const o=document.getElementsByClassName(e);let t=Array.from(o).some(n=>n.checked);Array.from(o).forEach(n=>{n.required=!t})}window.deRequire=a;
