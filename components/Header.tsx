"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, ShoppingCartIcon, Bars3Icon } from '@heroicons/react/24/solid';
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { UserButton, useAuth } from "@clerk/nextjs";
import { SearchSelect, SearchSelectItem, Select, SelectItem } from '@tremor/react';
import { useRouter } from "next/navigation";
import Link from 'next/link';



type Props = {};


const Header: React.FC<Props> = () => {
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const {userId} = useAuth();
  const isAuth = !!userId;
  const [isHovered, setIsHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false); // State for tracking search pending state
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
   
    event.preventDefault();
    // Accessing the value of the input field
    const input = inputRef.current?.value;
    if (!input) return;

    try {
      setIsSearching(true); // Set searching state to true
      // Simulate API call delay with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Replace with actual API call

      console.log('Searching for:', input);
      // Handle search functionality here

      setSearchTerm(input || ''); // Update the state if needed

      // Constructing the URL with query parameters
      const params = new URLSearchParams();

      router.push(`/search/${input}?${params.toString()}`);
    } catch (error) {
      console.error('Error searching:', error);
      // Handle errors
    } finally {
      setIsSearching(false); // Set searching state to false after search completes
    }
  };

  /* if (loading) {
    // Handle loading state if needed
    return <div>Loading...</div>;
  } */

  return (
    <header className="sticky top-0 z-50">
      {/* Top nav */}
      <div className="flex items-center justify-between bg-amazon_blue p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
      <Link href="/">
            <Image
              src="/logos.png"
              alt="Logo"
              width={200}
              height={53}
              objectFit="contain"
              className="cursor-pointer"
            />
        
        </Link>
        {/* Search */}
        <form
        className="flex flex-wrap gap-1"
          onSubmit={handleSearch}
          
          >

          <div className='flex items-center gap-1 w-full px-4'>
            
          <input
            ref={inputRef}
            className="flex-grow flex-shrink p-2 px-96 h-full rounded-l-md focus:outline-none"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

        <button type="submit" className="hidden sm:flex items-center h-10 rounded-md font-bold py-4 px-4 disabled:opacity-50 cursor-pointer bg-yellow-400 hover:bg-yellow-500 p-2" disabled={isSearching}>
            
            {isSearching ? 'Search...' : <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            
          </button> 
        
          
          </div>
        </form>

        {/* Right */}
        <div className="text-white justify-between flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
        <div
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         className="relative" // Add this class for positioning
  >
    <p>{user ? `Hello, ${user.firstName}` : "Sign In"}</p>
    <p className="font-extrabold md:text-sm">Account & List</p>
    {isHovered && (
      <div className="absolute top-full left-0 bg-white shadow-md p-4 min-w-px" 
       >
        {user ? (
          <div className="flex flex-col space-y-4">
            <div className="bg-yellow-400 font-extrabold text-black rounded-md px-4 py-2">
              <SignOutButton />
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <div className="bg-yellow-400 font-extrabold text-center text-black rounded-md px-4 py-2">
              <SignInButton />
            </div>
            <div>
              <p className="text-black">
                New customer?{" "}
                <Link href="/sign-up" passHref>
                  <span className="text-blue-500">Start here.</span>
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    )}
  </div>
  
          {/*} {!isAuth ? ( <><Link href="/sign-in">
          <li>Login</li>

          </Link>
          <Link href="/sign-up">
          <li>sign-up</li>

          </Link>
          </>
           ):
           (
           <>
          <li>
            <UserButton afterSignOutUrl="/" />
          </li>
          </>
           )} */}
         
          <div className="link">
            <p></p>
            <p className="font-extrabold md:text-sm"></p>
          </div>
          <div className="relative link flex items-center">
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
              0
            </span>
          
            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
              
            </p>
          </div>
        </div>
      </div>
      </div>
      {/* Bottom nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" />
          All
        </p>
        
      </div>
    </header>
  );
}

export default Header;
