const { getData,aDate,findingIndex,sortingFirst,findAdate } = useSortDates('trainingDates','created_at','datesSet',100  );

const makingPayment = async() =>{
await usersFromBase?.map(async(el,ind)=>{
if(selectedUser.value === el.id){
const   date1 = await el.due ;

await getData();
await sortingFirst();
await findingIndex(date1);
await findAdate(4);
}
} )
}
console.log('aDate',aDate)
     

   
  return(
   <>
      <p>{aDate.toDate().ToLocaleDateString()}</p>
  
 	 </>);
  
  
