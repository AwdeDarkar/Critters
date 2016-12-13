function draw(ps)
{
    //DRAW POPULATION
    var poplist = document.getElementById("poplist");
    clearnode(poplist);
    for(var i = 0; i < ps.totalPop.length; i++)
    {
        var row = poplist.insertRow(i);
        var gencell = row.insertCell(0);
        var hpcell = row.insertCell(1);
        var agecell = row.insertCell(2);
        var xpcell = row.insertCell(3);
        var selcell = row.insertCell(4);

        gencell.innerHTML = i + ")";
        hpcell.innerHTML = ps.totalPop[i].hp;
        agecell.innerHTML = ps.totalPop[i].age;
        xpcell.innerHTML = ps.totalPop[i].xp;
        var box = document.createElement("input");
        box.type = "checkbox";
        box.id = "poplist_dex_" + i;
        box.class = "poplist_dex";
        box.onclick = drawButtons;
        selcell.appendChild(box);
    }
}

function drawButtons()
{
    var numbtns = 0;
    var btnlist = document.getElementsByClassName("popbtn");
    for(var i = 0; i < btnlist.length; i++)
    {
        if(btnlist[i].checked)
            numbtns++;
    }
    if(numbtns == 2)
    {
        document.getElementById("btn_createLine").disabled = false;
    }else
    {
        document.getElementById("btn_createLine").disabled = true;
    }
}

function clearnode(node)
{
    while (node.firstChild) { node.removeChild(node.firstChild); }
}

function update()
{

}

function init()
{
    var ps = new PlayerSite();
    var critter = loadCritter($($.parseXML(HARD_DEF_CRITTER)));
    ps.totalPop.push(critter);
    ps.totalPop.push(critter);

    return ps;
}

var Critter = function()
{
	this.hp = 0;
	this.age = 0;
	this.xp = 0;
    this.gen = 0;
	this.special = [];
}

var PlayerSite = function(mainSite)
{
	this.main = mainSite;
	this.clay = 0;
	this.sClay = 0;
	this.food = 0;
	this.sFood = 0;
	this.ubt = 0;
	this.buildings = [];
	this.projects = [];
	this.breeders = [];
	this.armies = [];
	this.totalPop = [];
	this.workHours = 0;
	this.hoursHarvest = 0;
	this.hoursMine = 0;
	this.drawUBT = 0;

	this.Update = function() //include frequencies??
	{
		this.clay = min(this.clay + this.hoursMine, this.sClay);
		this.food += min(this.food + this.hoursHarvest, this.sFood);

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
			this.breeders[k].breed(this);
			this.checkFood();
		}

		this.food -= this.totalPop;
		this.checkFood();
		this.main.submitTurn(this);
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

	this.breed = function(site)
	{
		var critter = new Critter();
		critter.age = 0;
		critter.xp = 0;
		critter.hp = 10; //NEWHP
        critter.gen = max(a.gen+1, b.gen+1);
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



function getTag(doc, tag) { return doc.find(tag).text(); }

var HARD_DEF_CRITTER = "<critter>\n\t<age>0</age>\n\t<hp>10</hp>\n\t<xp>0</xp>\n\t<special>\n\t\t<sp>progen</sp>\n\t</special>\n</critter>";
