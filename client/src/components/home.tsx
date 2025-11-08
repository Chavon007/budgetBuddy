import Navbar from "./navbar.tsx";
import Banner from "./banner.tsx";
import About from "./about.tsx";
import Footer from "./footer.tsx";

function Home() {
  return (
    <div className="">
      <Navbar />
      <Banner />
      <About />
      <Footer/>
    </div>
  );
}
export default Home;
