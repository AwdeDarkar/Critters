var HARD_DEF_CRITTER = "<critter>\n\t<age>0</age>\n\t<hp>10</hp>\n\t<xp>0</xp>\n\t<special>\n\t\t<sp>progen</sp>\n\t</special>\n</critter>";
var BREED_UPDATE = 4;
var OLD_AGE = 12;

function handleLogin()
{
    var state = $.cookie('playerstate');
    if(state == null)
    {
        newPlayer();
    }
    else
    {

    }
}

function newPlayer()
{
    init();
    var id = $.get("http://wwwp.cs.unc.edu/Courses/comp426-f16/users/povran/project/update.php?type=genplayer");
    console.log(id);
    ps.id = 0;

	draw();
	setInterval(draw, 5000);
	setInterval(update, 1000);
    setInterval(saveState, 10000);
}

function saveState()
{
    $.removeCookie('playerstate');
    $.cookie('playerstate', JSON.stringify(ps), { expires : 1});
}

function draw()
{
    //UPDATE RESOURCE LIST
    document.getElementById("pop_info").innerHTML = ps.totalPop.length + " (" + Math.round((ps.breeders.length/BREED_UPDATE)*100)/100 + "/sec)";
    document.getElementById("food_info").innerHTML = Math.round(ps.food) + " (" + Math.round((ps.hoursHarvest - (ps.totalPop.length + (ps.breeders.length/BREED_UPDATE)))*100)/100 + "/sec)";
    document.getElementById("clay_info").innerHTML = Math.round(ps.clay) + " (" + Math.round((ps.hoursMine*100))/100 + "/sec)";
    document.getElementById("ubt_info").innerHTML = ps.ubt;
    document.getElementById("wrk_info").innerHTML = Math.round(ps.workHours*100)/100;

    //DRAW POPULATION
    var poplist = document.getElementById("poplist");
    clearnode(poplist);

    for(var i = 0; i < ps.totalPop.length; i++)
    {
        var row = poplist.insertRow(i);
        row.setAttribute("class", "poplistrw");
        var gencell = row.insertCell(0);
        var hpcell = row.insertCell(1);
        var agecell = row.insertCell(2);
        var xpcell = row.insertCell(3);
        var selcell = row.insertCell(4);

        gencell.innerHTML = i + ")";
        hpcell.innerHTML = "hp: " + Math.round(ps.totalPop[i].hp);
        agecell.innerHTML = "age: " + ps.totalPop[i].age;
        xpcell.innerHTML = "xp: " + Math.round(ps.totalPop[i].xp*100)/100;
        if(ps.totalPop[i].job === "none")
        {
            var box = document.createElement("input");
            box.type = "checkbox";
            box.id = "poplist_dex_" + i;
            box.setAttribute("class", "poplist_dex");
            box.setAttribute("onclick", "drawButtons();" );
            selcell.appendChild(box);
        }else
        {
            selcell.innerHTML = ps.totalPop[i].job;
        }
    }

    //DRAW BREED LINES
    var breedlist = document.getElementById("d_breedlist");
    clearnode(breedlist);
    for(var i = 0; i < ps.breeders.length; i++)
    {
        var box = document.createElement("DIV");
        box.setAttribute("class", "breedline");
        var p = document.createElement("P");
        p.innerHTML = "Line " + i;
        box.appendChild(p);
        var ul = document.createElement("UL");
        var li1 = document.createElement("LI");
        li1.innerHTML = "HP: " + Math.round(ps.breeders[i].meanHP);
        ul.appendChild(li1);
        var li2 = document.createElement("LI");
        li2.innerHTML = "XP: " + Math.round((Math.min(ps.breeders[i].a.xp,ps.breeders[i].b.xp)*100))/100;
        ul.appendChild(li2);
        //for(var j = 0; j < ps.breeders[i].special.length; i++) { }
        box.appendChild(ul);
        breedlist.appendChild(box);
    }
}

function drawButtons()
{
    var numbtns = 0;
    var bxlst = document.getElementsByClassName("poplist_dex");
    for(var i = 0; i < bxlst.length; i++)
    {
        if(bxlst[i].checked)
            numbtns++;
    }

    if(numbtns == 2)
    {
        document.getElementById("btn_createLine").disabled = false;
    }else
    {
        document.getElementById("btn_createLine").disabled = true;
    }

    if(numbtns > 0)
    {
        var btnlst = document.getElementsByClassName("popbtn");
        for(var i = 1; i < btnlst.length; i++)
        {
            btnlst[i].disabled = false;
        }
    }
    else
    {
        var btnlst = document.getElementsByClassName("popbtn");
        for(var i = 1; i < btnlst.length; i++)
        {
            btnlst[i].disabled = true;
        }
    }
}

function clearnode(node)
{
    while (node.firstChild) { node.removeChild(node.firstChild); }
}

function update()
{
    ps.update();
}

function init()
{
    ps = new PlayerSite();
    var critter = loadCritter($($.parseXML(HARD_DEF_CRITTER)));
    ps.totalPop.push(critter);
    ps.totalPop.push(critter);
}

function newLine()
{
    var bxlst = document.getElementsByClassName("poplistrw");
    var dexa;
    var dexb;
    var s = 0;
    for(var i = 0; i < bxlst.length; i++)
    {
        var box = document.getElementById("poplist_dex_" + i);
        if(box != null && box.checked && s == 0)
        {
            dexa = i;
            s++;
        }
        else if(box != null && box.checked && s == 1)
        {
            dexb = 1;
        }
    }
    ps.newBreeder(dexa, dexb);
    draw();
    drawButtons();
}

function toFarms()
{
    var bxlst = document.getElementsByClassName("poplistrw");
    for(var i = 0; i < bxlst.length; i++)
    {
        var box = document.getElementById("poplist_dex_" + i);
        if(box != null && box.checked)
        {
            ps.hoursHarvest += ps.totalPop[i].xp * 1.2;
            ps.totalPop[i].job = "farmer";
        }
    }
    draw();
    drawButtons();
}

function toBarracks()
{
    var bxlst = document.getElementsByClassName("poplistrw");
    for(var i = 0; i < bxlst.length; i++)
    {
        var box = document.getElementById("poplist_dex_" + i);
        if(box != null && box.checked)
        {
            //SEND THIS TO BARRACKS
        }
    }
    draw();
    drawButtons();
}

function toMines()
{
    var bxlst = document.getElementsByClassName("poplistrw");
    for(var i = 0; i < bxlst.length; i++)
    {
        var box = document.getElementById("poplist_dex_" + i);
        if(box != null && box.checked)
        {
            ps.hoursMine += ps.totalPop[i].xp;
            ps.totalPop[i].job = "miner";
        }
    }
    draw();
    drawButtons();
}

var Critter = function()
{
	this.hp = 0;
	this.age = 0;
	this.xp = 0;
    this.gen = 0;
    this.job = "none";
	this.special = [];
}

var PlayerSite = function(mainSite)
{
    this.id = -1;
	this.main = mainSite;
	this.clay = 0;
	this.sClay = 100;
	this.food = 10000;
	this.sFood = 100000;
	this.ubt = 0;
	this.buildings = [];
	this.projects = [];
	this.breeders = [];
    this.breednum = 0;
	this.armies = [];
	this.totalPop = [];
	this.workHours = 0;
	this.hoursHarvest = 0;
	this.hoursMine = 0;
	this.drawUBT = 0;

	this.update = function() //include frequencies??
	{
		this.clay = Math.min(this.clay + this.hoursMine, this.sClay);
		this.food = Math.min(this.food + this.hoursHarvest, this.sFood);

        //console.log(this.hoursHarvest);
		for(var i = 0; i < this.projects.length; i++)
		{
			this.projects[0].BuildUnit(this);
			this.checkHours();
			this.checkClay();
		}

		for(var j = 0; j < this.armies.length; j++)
		{
			this.armies[j].train(this);
			this.checkFood();
		}

		for(var k = 0; k < this.breeders.length; k++)
		{
            if(this.breednum > BREED_UPDATE)
            {
    			this.breeders[k].breed(this);
                this.food -= 1;
    			this.checkFood();
                this.breednum = 0;
            }
            this.breednum++;
            if(this.totalPop.length < 1)
                this.breeders = [];
		}

        workHours = 0;
        for(var i = 0; i < this.totalPop.length; i++)
        {
            if(this.breednum > BREED_UPDATE)
            {
                this.totalPop[i].age++;
                if(this.totalPop[i].age > OLD_AGE)
                {
                    this.totalPop[i].hp--;
                }
            }
            if(this.totalPop[i].hp <= 0)
            {
                for(var j = 0; j < this.breeders.length; j++)
                {
                    this.breeders[j].checkLife();
                }

                this.totalPop.splice(i,1);
            }
            if(this.totalPop[i].job === "none")
            {
                workHours += this.totalPop[i].xp;
            }
        }

		this.food -= this.totalPop.length;
		this.checkFood();
		//submitTurn(this);
	}

	this.checkHours = function()
	{
        if(this.workHours >= 0)
            return true;
        while(this.workHours < 0)
        {
            salvageTheUnfinished(this.projects);
            this.workHours++;
        }
	}

	this.checkFood = function()
	{
        if(this.food >= 0)
            return true;
        while(this.food < 0)
        {
            killTheWeak(this.totalPop);
            this.food++;
        }
	}

	this.checkClay = function()
	{
        if(this.clay >= 0)
            return true;
        while(this.clay < 0)
        {
            pillageTheOld(this.buildings);
            this.clay++;
        }
	}

	this.checkUBT = function()
	{

	}

    this.newBreeder = function(dexa, dexb)
    {
        line = new Breeder();
        line.a = this.totalPop[dexa];
        line.b = this.totalPop[dexb];
        line.id = this.breeders.length;
        line.a.job = "breeder";
        line.b.job = "breeder";
        line.meanHP = Math.min(line.a.hp, line.b.hp);
        //line.special = line.a.special.concat(line.b.special).unique();

        this.breeders.push(line);
    }
}

var Building = function()
{
	this.completion = 0.0;
	this.level = 0;
	this.name = "";
	this.progStep = 0;
	this.clayUse = 0;
	this.workUse = 0;
	this.ubtBoost = 0;

	this.BuildUnit = function(site)
	{
		this.completion += this.progStep;
		site.clay -= this.clayUse;
		site.workHours -= this.workUse;

		if(this.completion >= 1.0)
		{
			dex = site.projects.indexOf(this);
			site.projects.splice(dex,1);
			site.buildings.push(this);
		}
	}

	this.BoostToCompletion = function(site)
	{
		site.ubt -= this.completion * this.ubtBoost * 10;
		site.checkUBT();
	}

}

var Army = function()
{
    this.members = [];
    this.strength = [];
    this.calcStrength = function()
    {

    }
}

var Breeder = function()
{
	//Critters
	this.a = null;
	this.b = null;
    this.special = null;
    this.id = 0;
    this.meanHP = 0;

    this.checkLife = function()
    {
        if(this.a.hp <= 0 || this.b.hp <= 0)
        {
            ps.breeders.splice(this.id,1);
        }
    }

	this.breed = function(site)
	{
		var critter = new Critter();
		critter.age = 0;
        critter.job = "none";
		critter.xp = Math.max(Math.min(this.a.xp, this.b.xp), 1)*Math.random()*2;
		critter.hp = this.meanHP + Math.round((Math.random()-0.5)*2); //NEWHP
        critter.gen = Math.max(this.a.gen+1, this.b.gen+1);
		critter.special = this.genSpecial();
		site.totalPop.push(critter);
	}

	this.genSpecial = function()
	{

	}
}

function loadCritter(doc)
{
    var r = new Critter();
    r.age = getTag(doc, "age");
    r.hp = getTag(doc, "hp");
    r.xp = getTag(doc, "xp");
    r.gen = getTag(doc, "gen");
    //special = doc.find("special");
    //for(var i = 0; i < special.childNodes.length; i++) { r.special.push(special.childNodes[i].nodeValue); }
    return r;
}

function killTheWeak(pop)
{
    pop.splice(-1,1);
}

function getTag(doc, tag) { return doc.find(tag).text(); }
