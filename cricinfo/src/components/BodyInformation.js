import React, { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const BodyInformation = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`container mx-auto max-w-screen-lg mt-8 mb-12 p-4 rounded-lg  ${
        theme === false ? "bg-white text-black-700" : "bg-black text-white"
      } ${theme == false ? "shadow-lg" : "shadow-white"} `}
    >
      <h2 className="mb-4 font-serif">
        Why <span className="font-bold text-purple-600">Road Safety</span> is{" "}
        <span className="font-bold text-red-500">Important?</span>
      </h2>
      <p className="mb-4">
        <strong className="text-orange-600">Global Epidemic:</strong> Road
        traffic accidents cause approximately 1.35 million deaths each year,
        making them one of the top ten leading causes of death worldwide.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Youth Vulnerability:</strong> Road
        traffic accidents are the leading cause of death among young people aged
        5 to 29, posing a significant threat to their lives and well-being.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Economic Impact:</strong> Road
        traffic accidents consume about 3% of a country's Gross Domestic Product
        (GDP), including costs related to healthcare, property damage, and lost
        productivity.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Vulnerable Road Users:</strong>{" "}
        Pedestrians and cyclists are vulnerable road users and account for a
        significant portion of road traffic accident casualties.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Distracted Driving:</strong> The
        rise of distracted driving, often due to smartphone use, has become a
        major concern, significantly increasing the risk of accidents.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Speeding:</strong> Even a small
        increase in speed can lead to a substantial increase in the severity of
        accidents, making speeding a major factor in road traffic accidents.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Alcohol Impairment:</strong> Driving
        under the influence of alcohol or drugs remains a significant cause of
        accidents, putting both the driver and other road users at risk.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Seat Belts and Helmets:</strong> The
        use of seat belts and helmets significantly reduces the risk of injury
        in accidents, making them essential safety devices.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Global Initiatives:</strong> Many
        countries and organizations actively work to improve road safety through
        initiatives such as stricter traffic laws, awareness campaigns, and
        investments in safer road infrastructure.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Preventable Nature:</strong> Many
        road traffic accidents result from human behavior and are preventable.
        Promoting responsible driving practices and compliance with traffic
        rules is crucial.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Technology Solutions:</strong>{" "}
        Advanced vehicle safety technologies, such as lane departure warning
        systems and automatic emergency braking, have the potential to reduce
        accidents and their severity.
      </p>
      <p className="mb-4">
        <strong className="text-orange-600">Environmental Impact:</strong> Road
        accidents contribute to air pollution and environmental harm,
        underscoring the broader societal impact of road safety issues.
      </p>
    </div>
  );
};

export default BodyInformation;
