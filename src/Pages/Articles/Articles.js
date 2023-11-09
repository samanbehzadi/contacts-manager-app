import React, { useEffect, useState } from "react";
import Tobbar from "../../Components/Topbar/Tobbar";
import ArticleBox from "./../../Components/ArticleBox/ArticleBox";
import BreadCrumb from "./../../Components/BreadCrumb/BreadCrumb";
import Footer from "./../../Components/Footer/Footer";
import Navbar from "./../../Components/Navbar/Navbar";
import Pagination from "./../../Components/Pagination/Pagination";
import "./Articles.css";


export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [shownArticles, setShownArticles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);
      });
  }, []);

  return (
    <>
      <Tobbar />
      <Navbar />

      <BreadCrumb
        links={[
          { id: 1, title: "خانه", to: "" },
          {
            id: 2,
            title: "تمامی مقاله ها",
            to: "articles/1",
          },
        ]}
      />

      {/* <!--------------------------------  Articles-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownArticles.map((article) => (
                  <ArticleBox key={article._id} {...article} />
                ))}
              </div>
            </div>
          </div>

          <Pagination
            items={articles}
            itemsCount={3}
            pathname="/articles"
            setShownCourses={setShownArticles}
          />
        </div>
      </section>
      {/* <!--------------------------------  Articles-Section  --------------------------------> */}

      <Footer />
    </>
  );
}
