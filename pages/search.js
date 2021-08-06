import Header from '../components/Header'
import Footer from '../components/Footer'
import {useRouter} from 'next/dist/client/router'
import InfoCard from '../components/InfoCard';
import {format} from 'date-fns';

export default function Search(props) {

    const router=useRouter()
    
    console.log(router.query)
    
    const {location,startDate,endDate,numberOfGuest}=router.query;

    const formattedStartDate=format(new Date(startDate),"dd MMMM yy");
    const formattedEndDate=format(new Date(endDate),"dd MMMM yy");

    const range=`${formattedStartDate}  -  ${formattedEndDate}`;
    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${numberOfGuest} Guest`}/>
            <main>
                <section className="flex-grow pt-14 px-6">
                    <p>300+ Stays - {range} for {numberOfGuest} number of guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3">

                        <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Cancellation Flexibility</p>
                        <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Type Of Place</p>
                        <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Price</p>
                        <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">Rooms and Beds</p>
                        <p className="px-4 py-2 border rounded-full cursor-pointer hover:shadow-lg active:scale-95 active:bg-gray-100 transition transform duration-100 ease-out">More filters</p>
                    </div>
                    <div className="flex flex-col">
                    {props.searchResults?.map((item)=>(
                       <InfoCard key={item.img} location={item.location} img={item.img} title={item.title} description={item.description} star={item.star} price={item.price} total={item.total}/>
                   ))}
                    </div>
                  
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export async function getServerSideProps(){
    const searchResults=await fetch('https://links.papareact.com/isz').then(res=>res.json());

    return {
        props:{
            searchResults,
        }
    }
}