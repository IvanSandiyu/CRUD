/*function EnviarDatosAlumno(){
  const formularioAlumno = document.querySelector("#crear-al");
  formularioAlumno.addEventListener('submit', async e => {
    e.preventDefault()
    const n = formularioAlumno['nombre'].value
    const a = formularioAlumno['apellido'].value
    const d = formularioAlumno['dni'].value

    //console.log(n,a,d)
    //Convertimos los datos a objetos para enviarlos al back
    const response = await fetch("/api/alumnos", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'}
      ,
      body: json.stringify({
        n,
        a,
        d,
      }),
    });
    
  })

}
/*
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/alumnos")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);*/
