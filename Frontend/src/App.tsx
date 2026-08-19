import Swal from "sweetalert2";

function App() {
  function handleClick() {
    Swal.fire({
      title: "SweetAlert2",
      text: "This is an alert using the SweetAlert2 library!",
      icon: "success",
      confirmButtonText: "Nice!"
    });    
  }

  async function getName() {
    await Swal.fire({
      title: "Question",
      text: "What's your name? ",
      input: "text",
      inputPlaceholder: "Name here"
    });
  }

  return (
    <>
      <button onClick={handleClick}>Click me!</button>
      <button onClick={getName}>Answer question</button>
    </>
  )
}

export default App;
