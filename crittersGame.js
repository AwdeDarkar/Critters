function draw(ps)
{
    //DRAW POPULATION
    var poplist = document.getElementById("poplist");
    clearnode(poplist);
    for(var i = 0; i < ps.length; i++)
    {
        var row = poplist.insertRow(0);
        var hpcell = row.insertCell(0);
        var agecell = row.insertCell(1);
        var xpcell = row.inserCell(2);

        hpcell.innerHTML = ps[i].hp;
        agepcell.innerHTML = ps[i].age;
        xpcell.innerHTML = ps[i].xp;
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
    var critter = loadCritter(HARD_DEF_CRITTER);
    ps.totalPop.push(critter);
    ps.totalPop.push(critter);

    return ps;
}

var Critter = function()
{
	this.hp = 0;
	this.age = 0;
	this.xp = 0;
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

	}

	this.checkFood = function()
	{

	}

	this.checkClay = function()
	{

	}

	this.checkUBT = function()
	{

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
		critter.special = this.genSpecial();
		site.totalPop.push(critter);
	}

	this.genSpecial = function()
	{

	}
}

function loadCritter(xmlStr)
{
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlStr,"text/xml");
    var r = new Critter();
    r.age = getTag(xmlDoc, "age");
    r.hp = getTag(xmlDoc, "hp");
    r.xp = getTag(xmlDoc, "xp");
    special = doc.getElementByTagName("special");
    for(var i = 0; i < special.childNodes.length; i++) { r.special.push(special.childNodes[i].nodeValue); }
    return r;
}



function getTag(doc, tag) { return doc.getElementsByTagName(tag)[0].childNodes[0].nodeValue; }

var HARD_DEF_CRITTER = "<critter>\n\t<age>0</age>\n\t<hp>10</hp>\n\t<xp>0</xp>\n\t<special>\n\t\t<sp>progen</sp>\n\t</special>\n</critter>";
