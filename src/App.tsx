import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://api-vera.susi.spherity.dev/credential-registry/did:web:api-rcs.susi.spherity.dev:did-registry:acme-power-drive-x-1000-3985-cb-1739186-d-8-d").then((res) => res.json()).then((data) => setData(data));
  }, []);

  console.log(data);
  const Loading = () => data == null && <div>Loading...</div>;
  const Data = () => data != null && <div>data</div>;
  return (
    <>
      <div>
        <Loading />
        <Data />
      </div>
    </>
  );
}

export default App;
