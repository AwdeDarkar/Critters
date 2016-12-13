<?php
   include('session.php');
?>

<html lang="en">
	<head>
		<title>Critters</title>

		<meta charset="UTF-8">
		<meta name="description" content="Home">
		<meta name="author" content="Brian Dalton, Benjamin Croisdale">

		<link rel='stylesheet' type='text/css' href='oldStyles.css'>

		<!-- jQuery CDN -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

		<!-- Google Fonts -->
		<link href="https://fonts.googleapis.com/css?family=Trocchi|Yatra+One" rel="stylesheet">

	</head>

	<body>
		<div id="header">
			<h1>Home Village</h1>
		</div>

		<!-- Construction Queue -->
		<div class="ctr_pane" id="d_consq">
			<h2>Construction Queue</h2>
			<button id="button1" type="button" onclick="buildBridge()">  Build Bridge to Mainland (<label id="bridgeBuilt">0</label>/10 complete)
			<br> Costs 3 critters </button> &nbsp&nbsp&nbsp
			<button id="button1" type="button" onclick="buildAttackBarracks()">  Build Attacking Barracks (<label id="barracks1Built">0</label>/5 complete)
			<br> Costs 3 critters </button> &nbsp&nbsp&nbsp
			<button id="button1" type="button" onclick="buildDefenseBarracks()">  Build Defending Barracks (<label id="barracks2Built">0</label>/5 complete)
			<br> Costs 3 critters </button>
		</div>

		<!-- Resource Gathering -->
		<div class="ctr_pane" id="d_gather">
			<h2>Resource Center</h2><br>
			<p>Current Resource Stock: <label id="total">0</label></p>
			<button id="button1" type="button" onclick="resetTime()">  Collect Resources (<label id="number">0</label> Available)  </button>
		</div>

		<div class="ctr_pane" id="d_common_area">
			<button id="button1" type="button" onclick="window.location='mainland.html';"> Go to <br> Mainland </button>
		</div>

		<!-- Critters available -->
		<div class="ctr_pane" id="d_avail">
			<h2>Critters Available</h2><br>
			<p><a id="attack">Attacking Critters: <label id="attackCount">0</label> | <a>
			Building Critters: <label id="critterCount">0</label>
			<a id="defend"> | Defending Critters: <label id="defenseCount">0</label></p>
			<button id="button1" type="button" onclick="createCritter()">  Breed Critter </button>
		</div>

		<!-- Training -->
		<div class="ctr_pane" id="d_train">
			<h2>Training</h2>
			<button id="button2" type="button" onclick="createAttackCritter()">  Breed Attacking Critter </button> &nbsp&nbsp&nbsp
			<button id="button3" type="button" onclick="createDefenseCritter()">  Breed Defending Critter </button>
		</div>

    <div id="footer">
      <a href = "logout.php">Sign Out</a>
    </div>

		<script type="text/javascript">
				$('#d_common_area').hide();
				$('#d_consq').hide();
				$('#d_avail').hide();
				$('#d_train').hide();
				$('#attack').hide();
				$('#defend').hide();
				$('#button2').hide();
				$('#button3').hide();
        var countLabel = document.getElementById("number");
				var totalLabel = document.getElementById("total");
        setInterval(setTime, 100);
        var totalSeconds = 0;

        function setTime(){
					countLabel.innerHTML = pad(totalSeconds);
					if (countLabel.innerHTML < 100){
            ++totalSeconds;
					}
        }
        function resetTime() {
						totalLabel.innerHTML = parseInt(countLabel.innerHTML) + parseInt(totalLabel.innerHTML);
            totalSeconds = -1;
            setTime();
						reveal();
        }
        function pad(val){
            var valString = val + "";
            return valString;
        }

				function reveal(){
					  if (totalLabel.innerHTML > 9){
							$('#d_avail').show();
						}
						if (critterCount.innerHTML > 4){
							$('#d_consq').show();
						}
						if (bridgeBuilt.innerHTML > 9){
							$('#d_common_area').show();
						}
						if (barracks1Built.innerHTML > 4){
							$('#attack').show();
							$('#d_train').show();
							$('#button2').show();
						}
						if (barracks2Built.innerHTML > 4){
							$('#defend').show();
							$('#d_train').show();
							$('#button3').show();
						}
				}

				var critterCount = document.getElementById("critterCount");
				function createCritter(){
					  if (totalLabel.innerHTML > 9){
							critterCount.innerHTML = parseInt(critterCount.innerHTML) + 1;
							totalLabel.innerHTML -= 10;
							reveal();
						}
						else{
							alert("Not enough resources!");
						}
				}

				var attackCount = document.getElementById("attackCount");
				var defenseCount = document.getElementById("defenseCount");
				function createAttackCritter(){
					  if (totalLabel.innerHTML > 9){
							attackCount.innerHTML = parseInt(attackCount.innerHTML) + 1;
							totalLabel.innerHTML -= 10;
							reveal();
						}
						else{
							alert("Not enough resources!");
						}
				}
				function createDefenseCritter(){
					  if (totalLabel.innerHTML > 9){
							defenseCount.innerHTML = parseInt(defenseCount.innerHTML) + 1;
							totalLabel.innerHTML -= 10;
							reveal();
						}
						else{
							alert("Not enough resources!");
						}
				}

				var bridgeBuilt = document.getElementById("bridgeBuilt");
				function buildBridge(){
					if (critterCount.innerHTML > 2){
						if (bridgeBuilt.innerHTML < 10){
							bridgeBuilt.innerHTML = parseInt(bridgeBuilt.innerHTML) + 1;
							critterCount.innerHTML -=3;
							reveal();
						}
						else{
							alert("Bridge already fully built!");
						}
					}
					else{
						alert("Not enough critters!");
					}
				}

				var barracks1Built = document.getElementById("barracks1Built");
				var barracks2Built = document.getElementById("barracks2Built");
				function buildAttackBarracks(){
					if (critterCount.innerHTML > 2){
						if (barracks1Built.innerHTML < 5){
							barracks1Built.innerHTML = parseInt(barracks1Built.innerHTML) + 1;
							critterCount.innerHTML -=3;
							reveal();
						}
						else{
							alert("Attacking Barracks already fully built!");
						}
					}
					else{
						alert("Not enough critters!");
					}
				}
				function buildDefenseBarracks(){
					if (critterCount.innerHTML > 2){
						if (barracks2Built.innerHTML < 5){
							barracks2Built.innerHTML = parseInt(barracks2Built.innerHTML) + 1;
							critterCount.innerHTML -=3;
							reveal();
						}
						else{
							alert("Defending Barracks already fully built!");
						}
					}
					else{
						alert("Not enough critters!");
					}
				}
    </script>
</body>
</html>
