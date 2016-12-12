<?php
    $REFRESH_RATE = 1000;
    $date = new DateTime();
    $conn = mysqli_connect("classroom.cs.unc.edu","povran","qYTwnMv2XA8zWwUX","povrandb");
    if(!$conn)
    {
        echo "Connection to database failed";
    }

    function createPlayer($name, $password)
    {

    }

    function loginPlayer($name, $password)
    {

    }

    function checkLogin($name, $sessionID)
    {

    }

    function createArmy($playerID, $loc, $defend, $size, $special)
    {
        $sql = "INSERT INTO Armies (playerID, locationID, defense, size, special) VALUES (";
        $sql .= $playerID . ", ";
        $sql .= $loc . ", ";
        $sql .= $defend . ", ";
        $sql .= $size . ", ";
        $sql .= $special . ", ";
        mysqli_query($conn, )
    }

    function sendMessage($messageID, $sender, $reciever, $content, $resources)
    {
        $senderName = mysqli_query($conn, "SELECT name FROM Players WHERE playerID=".$sender);
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');

        $message .= "<messageID>" . $messageID . "</messageID>";
        $message .= "<sender>" . $senderName . "</sender>";
        $message .= "<reciever>" . $reciever . "</reciever>";
        $message .= "<content>" . $content . "</content>";
        $message .= "<resources>" . $resources . "</resources>";

        echo $message;
        flush();
    }

    function grab($id)
    {
        boolean $updated = false;
        //get updatetime from database
        if(date_timestamp_get($date) - $updatetime > $REFRESH_RATE) { update(); $updated=true; }

        $state = "";
        //armies update
        //

        echo state;
    }

    function update()
    {

    }
?>
