var current;
function changePage(path) {
    window.location.href=path;
}
function changeSite(path) {
    window.open(path);
}
changeTheName(1);
document.getElementById('next').onclick = (event) => {
    var index = document.getElementById("earth").src;
    var index = parseInt(index.substr(index.indexOf("planets/")).match(/(\d+)/));
    index++;
    if (index > 7){
        index = 1;
    }
    document.getElementById("earth").src = "images/planets/"+index.toString()+".svg";
    changeTheName(index); 
}
document.getElementById('previous').onclick = (event) => {
    var index = document.getElementById("earth").src;
    var index = parseInt(index.substr(index.indexOf("planets/")).match(/(\d+)/));
    index-=1;
    if (index < 1){
        index = 7;
    }
    changeTheName(index);
}
function changeTheName(index){
    document.getElementById("earth").src = "images/planets/"+index.toString()+".svg";
    if (index==1){
        document.getElementById("name").innerText = "CLASSIC";
    }
    if (index==2){
        document.getElementById("name").innerText = "QUICK!";
    }
    if (index==3){
        document.getElementById("name").innerText = "APUSH";
    }
    if (index==4){
        document.getElementById("name").innerText = "AP WORLD";
    }
    if (index==5){
        document.getElementById("name").innerText = "MODERN";
    }
    if (index==6){
        document.getElementById("name").innerText = "WORLD WARS";
    }
    if (index==7){
        document.getElementById("name").innerText = "BLUEPRINT";
    }
    document.getElementById("scrollList").textContent = '';
    var node = document.createElement("div");
    node.classList.add("leaderboardGrid");
    node.classList.add("headerLeader");
    var innerPlace1 = document.createElement("h6");
    innerPlace1.innerText= "#"
    var innerPlace2 = document.createElement("h6");
    innerPlace2.innerText="USERNAME";
    var innerPlace3 = document.createElement("h6");
    innerPlace3.innerText="SCORE";
    var innerPlace4 = document.createElement("h6");
    innerPlace4.innerText="TIME (s)";
    node.appendChild(innerPlace1);
    node.appendChild(innerPlace2);
    node.appendChild(innerPlace3);
    node.appendChild(innerPlace4);
    getLeaderboards(index);
    document.getElementById("scrollList").appendChild(node);
}
async function getLeaderboards(index) {
    var actual = [];
    fetch("https://raw.githubusercontent.com/LeeechLabStudios/era.guessr.database/main/Leaderboards/LD"+index.toString()+".json")
    .then(response => response.json())
        .then(arrays => {
        arrays["LD"].forEach(item =>{
            var j = 0;
            for (let l = 0; l < actual.length; l++) {
                if (actual[l][2] > item[2]) {
                    j += 1;
                } else if (actual[l][2]==item[2]) {
                    if (actual[l][3] > item[3]) {
                        j += 1;
                    }
                }
            }
            actual.splice(j, 0, item);
        });
    })
    .then(arrays => {
        var joobaa = 0;
        actual.forEach(item => {
            joobaa += 1;
            var node = document.createElement("div");
            node.classList.add("leaderboardGrid");
            var innerPlace1 = document.createElement("h6");
            innerPlace1.innerText= "#" + joobaa.toString();
            var innerPlace2 = document.createElement("h6");
            innerPlace2.innerText=item[0];
            var innerPlace3 = document.createElement("h6");
            innerPlace3.innerText=item[2].toString();
            var innerPlace4 = document.createElement("h6");
            innerPlace4.innerText=item[3].toString() + "s";
            node.appendChild(innerPlace1);
            node.appendChild(innerPlace2);
            node.appendChild(innerPlace3);
            node.appendChild(innerPlace4);
            document.getElementById("scrollList").appendChild(node);
        });
        
    })
    .catch(error=>console.error("Error Fetching Leaderboards:", error));
}
changeIdeaPage("phase1")
function changeIdeaPage(what) {
    current = what;
    document.getElementById("phase1").style.display = "none";
    document.getElementById("phase2").style.display = "none";
    document.getElementById("phase3.1").style.display = "none";
    document.getElementById("phase3.2").style.display = "none";
    document.getElementById("phase3.3").style.display = "none";
    document.getElementById("phase3.4").style.display = "none";
    document.getElementById("phase4").style.display = "none";
    document.getElementById(what).style.display = "grid";
}
function submitIdea() {
    var ideaType;
    if (current == "phase3.1"){
        ideaType = "FACE";
    }
    if (current == "phase3.3"){
        ideaType = "OUTFIT";
    }
    if (current == "phase3.2"){
        ideaType = "IMAGE";
    }
    if (current == "phase3.4"){
        ideaType = "GAMEPLAY";
    }
    var idea = document.getElementById(ideaType + 'Description').value;
    var url ="";
    if (current != "phase3.4") {
        url = document.getElementById(ideaType + 'URL').value;
        if (url.length > 10) {
            url = "%0A%0AAdditional Image URL: " + url;
        }
        else {
            url = "";
        }
    }
    changeSite("mailto:?to=eraguessr@gmail.com&subject=Era%20Guessr%20Idea&body=I%20have%20a(n)%20" + ideaType + "%20idea:%0A" + idea + url);
    changeIdeaPage("phase4");
}  