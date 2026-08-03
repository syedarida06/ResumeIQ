const button = document.getElementById("analyzeBtn");

const fileInput = document.getElementById("resumeFile");

button.addEventListener("click", function(){

   // uploaded file
   const file = fileInput.files[0];

   // create reader
   const reader = new FileReader();

   // after reading
   reader.onload = function(e){

      const text = e.target.result;
      console.log(text);

      const skills = ["HTML","CSS","JavaScript","Python","SQL"];
      skills.forEach(function(skill){
        if(text.includes(skill)){
            document.getElementById("skillslist").innerHTML+=`<span class="skill-pill found">&#10003;${skill}<span>`;
        }
        if(!text.includes(skill)){
            document.getElementById("missinglist").innerHTML+=`<span class="skill-pill missing-pill">+${skill}</span>`;
        }
      });

      let foundCount=0;
      skills.forEach(function(skill){
        if(text.includes(skill)){
        foundCount++;
        }

      });
      let matchPercent=Math.round((foundCount/skills.length)*100);
      document.getElementById("matchValue").innerText=matchPercent+"% Match";
      document.getElementById("progressDisplay").style.width=matchPercent+"%";

      const ctx = document.getElementById("skillChart");

new Chart(ctx, {

   type: "doughnut",

   data: {

      labels: ["Found Skills", "Missing Skills"],

      datasets: [{

         data: [
            foundCount,
            skills.length - foundCount
         ]

      }]

   }

});
const insights=document.getElementById("insightsList");
insights.innerHTML="";
if(text.includes("HTML") && text.includes("CSS")){
   insights.innerHTML += "<li>Good frontend skills</li>";
}
if(text.includes("JavaScript")){

   insights.innerHTML += "<li>Knows JavaScript</li>";
}
if(text.includes("Python")&&
   text.includes("C++")&&
   text.includes("java")){

   insights.innerHTML += "<li>Strong programming basics detected</li>";
}
if( text.includes("Node.js")&&
    text.includes("SQL")){
      insights.innerHTML+="<li>Backend development skills detected.</li>";
}
if(!text.includes("React")){

   insights.innerHTML += "<li>Add React to improve profile</li>";
}
if(!text.toLowerCase().includes("project")){
   insights.innerHTML+="<li>Add project section to strengthen resume.</li>";
}
if(!text.toLowerCase().includes("internship")){
   insights.innerHTML+="<li>Internship experience can improve your profile.</li"
}
if(skills.length<3){
   insights.innerHTML+="<li>Resume needs more technical skills and projects.</li>";
}
if(skills.length>=5){
   insights.innerHTML+="<li>Good range of technical skills found.</li>";
}

// SAVE DATA

localStorage.setItem(

   "skills",

   document.getElementById("skillslist").innerHTML

);

localStorage.setItem(

   "match",

   document.getElementById("matchValue").innerHTML

);

localStorage.setItem(

   "insights",

   document.getElementById("insightsList").innerHTML

);
};

   // start reading file
   reader.readAsText(file);

});
// LOAD DATA AFTER REFRESH

window.onload = function(){

   if(localStorage.getItem("skills")){

      document.getElementById("skillslist").innerHTML =

      localStorage.getItem("skills");

   }

   if(localStorage.getItem("match")){

      document.getElementById("matchValue").innerHTML =

      localStorage.getItem("match");

   }

   if(localStorage.getItem("insights")){

      document.getElementById("insightsList").innerHTML =

      localStorage.getItem("insights");

   }

};
 document.getElementById("clearBtn")
 .addEventListener("click",function(){
   localStorage.clear();
   location.reload();
 });


