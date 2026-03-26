
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    let translateX = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");

      if (!box.length) return;

      const rectLeft = document
        .querySelector(".work-container")
        ?.getBoundingClientRect().left || 0;

      const rect = (box[0] as HTMLElement).getBoundingClientRect();
      const parentWidth = (box[0] as HTMLElement).parentElement?.getBoundingClientRect().width || 0;

      let padding =
        parseInt(window.getComputedStyle(box[0] as Element).padding) / 2;

      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-flex">
          {[...Array(6)].map((_value, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>Travel Ticket Booking</h4>
                    <p>Full stack</p>
                  </div>
                </div>

                <h4>Travel Ticket Booking</h4>
                <p>Java, OOP, File Handling, Exception Handling</p>


              </div>
              <div><h4>AWS Static Website Hosting</h4>
<p>AWS EC2, S3, GitHub, Deployment</p>
</div>
              

              <WorkImage image="/images/placeholder.webp" alt="project" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

