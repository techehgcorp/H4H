'use client'

import Header from "@/app/[locale]/components/Header";
// import Footer from "../components/Footer";
// import Header from "../components/Header";
// import InsurancePolicy from "../components/InsurancePolicy";
import Footer from "@/app/[locale]/components/Footer";
import InsurancePolicy from "@/app/[locale]/components/InsurancePolicy";
import ReferaFriendIn from "@/app/[locale]/components/ReferaFriendIn"
const ReferaFriend = () => {
  return (
    <>
      <Header />
      {/* <InsurancePolicy /> */}
      <ReferaFriendIn />
      <Footer />
    </>
  )
};

export default ReferaFriend;