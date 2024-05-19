import React from 'react'

const Header = () => (
  <div className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
    <button className="text-white mr-4">Features</button>
    <button className="text-white mr-4">Pricing</button>
    <button className="text-white mr-4">About</button>
    <button className="text-white mr-4">Contact</button>
    {/* <button className="text-white mr-4">Settings</button> */}
  </div>
)

export { Header }
