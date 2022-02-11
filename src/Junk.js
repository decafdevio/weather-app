getPostcode() {
    return this.getRequest("https://api.postcodes.io/postcodes/S38GW")
}

function App() {
    const [postcode, changeZip] = useState( {loading: "", postcode: ["result"], } );
    const [cfetching, zipFetching] = useState(false); //* Error ?
    const apiClient = new ApiClient();
  
    useEffect(() => { refreshZip(); }, []);
  
    const updateZip = (jsonResponse) => { changeZip( jsonResponse )};
    const refreshZip=()=>{
      changeZip({ loading:"loading.....", postcode:[], });
      zipFetching(true);
       apiClient.getPostcode()
         .then( (response)=>{ updateZip(response.data)
             console.log(response.data) } )
         .catch( (error) => { console.log(error); } )
         .finally(zipFetching(false));
     };

    //! Postcode Build
    const buildZip = () => {
        if (!postcode.result) {
          return (<></>)
        };
    
        return postcode.result.map( (result, i) => {
          const longt = (result.longitude);
          return (
            <>
            <span key={i}>{longt}</span>
            </>
          )
        });
      }
      //! Postcode Build />>
    }