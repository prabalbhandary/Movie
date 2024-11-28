import axios from "axios";
import { useEffect, useState } from "react";

function useFetchData(apiEndpoint) {
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    const [allMovie, setAllMovie] = useState([]);

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
            setLoading(false);
            return;
        }
        setLoading(true);
        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAlldata(alldata);
                setAllMovie(alldata);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        if (apiEndpoint) {
            fetchAllData();
        }
    }, [initialLoad, apiEndpoint]);

    return { alldata, allMovie, loading };
}

export default useFetchData;