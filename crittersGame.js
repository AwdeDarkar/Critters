var Game =
{

}

Game.draw = function()
{

}

Game.update = function()
{

}

Game.run = function()
{
  var loops = 0, skipTicks = 1000,
      maxFrameSkip = 10,
      nextGameTick = (new Date).getTime();

  return function
  {
    loops = 0;
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip)
	{
      Game.update();
      nextGameTick += skipTicks;
      loops++;
    }

    Game.draw();
  };
}();

// Start the game loop
Game._intervalId = setInterval(Game.run, 0);

var Critter = function()
{
	this.hp = 0;
	this.age = 0;
	this.exp = 0;
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

		for proj in this.projects
		{
			proj.BuildUnit(this);
			this.checkHours();
			this.checkClay();
		}

		for army in this.armies
		{
			army.train(this);
			this.checkFood();
		}

		for line in this.breeders
		{
			line.breed(this);
			this.checkFood();
		}

		this.food -= this.totalPop;
		this.checkFood();
		this.main.submitTurn(this);
	}

	this.checkHours()
	{

	}

	this.checkFood()
	{

	}

	this.checkClay()
	{

	}

	this.checkUBT()
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
}
