import React from "react";

const Footer = () => {
  return (
    <footer className=" bottom-0 left-0 w-full bg-gray-900 text-white py-1">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <h4 className="font-bold mb-2">Connect with Us</h4>
        <div className="flex space-x-5">
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <p className="mt-3">© 2023 VehicleGuardian. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
