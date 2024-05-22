"use client";
import React, { useState } from 'react';
import styles from './ShopSection.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HeroCarousel from './HeroCarousel';

interface Category {
  name: string;
  backgroundImage: string;
}

const ShopSection: React.FC = () => {
  const router = useRouter();

  const categories: Category[] = [
    { name: 'jewelery', backgroundImage: '/box1_image.jpg' },
    { name: 'Health & Personal Care', backgroundImage: '/box2_image.jpg' },
    { name: 'Furniture', backgroundImage: '/box3_image.jpg' },
    { name: 'Electronics', backgroundImage: '/box4_image.jpg' },
    { name: 'Beauty Picks', backgroundImage: '/box5_image.jpg' },
    { name: 'Pet Care', backgroundImage: '/box6_image.jpg' },
    { name: 'New Arrival in Toys', backgroundImage: '/box7_image.jpg' },
    { name: 'Discover Fashion Trends', backgroundImage: '/box8_image.jpg' },
  ];

  const handleCategoryClick = (category: string) => {
    const url = `/category/${encodeURIComponent(category)}`;
    console.log('Generated URL:', url);
    router.push(url);
  };

  return (
    <>
      <section className="px-6 md:px-20 py-10 top-0">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center"> 
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> SmartBuy</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            {/* Searchbar*/}

         </div>

          {/* HeroCarousel */}
          <HeroCarousel/>

       </div>
      </section>

      <div className={styles.shopSection}>
        {categories.map((categoryData, index) => (
          <div key={index} className={`${styles.box} ${styles[`box${index + 1}`]}`}>
            <Link href={`/category/${encodeURIComponent(categoryData.name)}`}>
              <div className={styles.boxContent} onClick={() => handleCategoryClick(categoryData.name)}>
                <h2>{categoryData.name}</h2>
                <div className={styles.boxImg} style={{ backgroundImage: `url("${categoryData.backgroundImage}")` }}></div>
                <p>See more</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
         {/* {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} /> 
         ))} */}
        </div>
      </section>
    </>
  );
};

export default ShopSection; 
