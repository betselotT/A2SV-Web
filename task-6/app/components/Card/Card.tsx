import React from "react";
import styles from "./Card.module.css";
import Link from "next/link";

interface JobType {
  id: string;
  title: string;
  desc: string;
  location: string;
  company: string;
  logo: string;
}

const Card = ({ title, desc, location, company, logo, id }: JobType) => {
  return (
    <Link href={`/jobs/${id}`}>
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.imageSide}>
            <img className={styles.img1} src="/images/image2.png" alt="" />
          </div>
          <div className={styles.writtenSide}>
            <h3 className={styles.h3}>{title}</h3>
            <p className={styles.p1}>{location}</p>
            <p className={styles.p2}>{desc}</p>
            <div className={styles.btns}>
              <button className={styles.btn1}>In Person</button>
              <button className={styles.btn2}>Education</button>
              <button className={styles.btn3}>IT</button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
