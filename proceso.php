<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "listado"; 

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_POST['registrar'])) {
    $nombre = $_POST['nombre'];
    $parentesco = $_POST['parentesco'];
    $foto = $_FILES['foto']['name'];
    $ruta = "uploads/" . basename($foto);

    if (move_uploaded_file($_FILES['foto']['tmp_name'], $ruta)) {
        $sql = "INSERT INTO familia (nombre, parentesco, foto) VALUES ('$nombre', '$parentesco', '$ruta')";
        $conn->query($sql);
        header("Location: index.html"); 
    }
}


if (isset($_POST['eliminar'])) {
    $id = $_POST['id'];
    $sql = "DELETE FROM familia WHERE id = $id";
    $conn->query($sql);
    header("Location: index.html");
}


if (isset($_POST['modificar'])) {
    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $parentesco = $_POST['parentesco'];
    $foto = $_FILES['foto']['name'];
    $ruta = "uploads/" . basename($foto);

    if (move_uploaded_file($_FILES['foto']['tmp_name'], $ruta)) {
        $sql = "UPDATE familia SET nombre='$nombre', parentesco='$parentesco', foto='$ruta' WHERE id=$id";
        $conn->query($sql);
        header("Location: index.html");
    }
}

$conn->close();
?>
