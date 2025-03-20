<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "listado";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM familia";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<p><strong>ID:</strong> " . $row['id'] . "<br>";
        echo "<strong>Nombre:</strong> " . $row['nombre'] . "<br>";
        echo "<strong>Parentesco:</strong> " . $row['parentesco'] . "<br>";
        echo "<img src='" . $row['foto'] . "' alt='Imagen' width='100' height='100'><br></p>";
        echo "<hr>";
    }
} else {
    echo "No hay registros disponibles.";
}

$conn->close();
?>
