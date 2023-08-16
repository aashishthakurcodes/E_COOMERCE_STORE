import React from "react";
import Header from "./Header";
import Footer from "./Footer";
//SEO
import { Helmet } from "react-helmet";
//Toast Notification
import  { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="keywords" content="HTML,CSS,JavaScript" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <title>{title}</title>
        
      </Helmet>
      <Header />
      <Toaster/>
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
};
Layout.defaultProps={
  title:"E-COMMERCE APP",
  description:"MERN Stack",
  keywords:"mern,react,node,mongodb",
  author:"Aashish"
}

export default Layout;
