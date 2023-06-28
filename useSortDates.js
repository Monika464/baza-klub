const  useSortDates = (collectionName,column1Name,column2Name,limitNum ) => {
const {db} = useFirebaseFunctions();
const [dataFromBase, setDataFromBase] = useState();
const [loading, setLoading] = useState(false);
const [justDates, setJustdates] = useState([]);
const [aDate,setADate] = useState({});
const [indexQDate, setIndexQDate] = useState(null);

  //POBIERANIE I SORTOWANIE DAT
const getData = async()=>{
    if (db) {
    const q = await query(
    collection(db, collectionName),
    orderBy(column1Name),
    orderBy(column2Name)
    )
    
  const unsub = await onSnapshot(q, (querySnapshot) => {
  let tempContainer =[];
    querySnapshot.forEach((doc) =>{
       tempContainer.push({...doc.data(), id:doc.id})
    })
    
      tempContainer.sort((a, b) => {
        const monthA = a.datesSet[0]?.toDate().getMonth();
        const monthB = b.datesSet[0]?.toDate().getMonth();
        if (monthA < monthB) {
        return -1;
       } else if (monthA > monthB) {
        return 1;
      } else {
      return 0;
      }
    });
    setDataFromBase(tempContainer)
  })
  return() => unsub()
}
};
  
//FUNKCJA  ZAPISUJACA NOWA POSORTOWANA TABLICĘ
const sortingFirst = async() => {
    let temp =[];
    await dataFromBase?.forEach((elem1, index1)=>{
          elem1.datesSet.forEach((elem2, index2)=>{
          temp.push(elem2)
          })
      });
  setJustdates(temp);
  
  justDates.sort((a, b) => {
    const dayA = a;
    const dayB = b;
    if (dayA < dayB) {
    return -1;
    } else if (dayA > dayB) {
    return 1;
    } else {
    return 0;
  }
  setJustdates(justDates)
  });
}
  
//KOLEJNA FUNKCJA ZNAJDOWANIE INDEXU
const findingIndex = async(qDate) =>{
    console.log("just dates", justDates);
    await justDates?.forEach((elemDat, indexDat)=>{
      const date2 = elemDat;
      console.log("data z just dates", date2, "index",indexDat);
      if  (date2?.seconds=== qDate?.seconds){
      console.log("mamy identyk",qDate?.toDate(), "indexDat", indexDat)
      return setIndexQDate(indexDat);
      }else { console.log("lipa")
      }
    })
  console.log('indexQDate',indexQDate )
}

//FUNKCJA ZAPISUJACA SZUKANA ZMIENNA
const findAdate = (num) =>{
  justDates?.forEach((elemSer, indexSer)=>{
    if(indexSer === (indexQDate + num)){
      return setADate(elemSer.toDate())
    }
  })
}
//KONIEC
return {dataFromBase,loading,diff,duplicates,aDate, getData,findingIndex,sortingFirst,findAdate}
