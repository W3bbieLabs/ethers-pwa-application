import logo from './logo.svg';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import { useContractRead, useContract, useContractEvents } from "@thirdweb-dev/react";
import { ethers } from "ethers";
//import { getAllPokemonList } from './api/pokemon';

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contractAddress, setContractAddress] = useState("0xCF205808Ed36593aa40a44F10c7f7C2F67d4A4d4");
  const initialized = useRef(false)
  const { contract } = useContract(contractAddress);
  const { data: trades } = useContractEvents(contract);
  //const { data: totalSupply, isLoading, error } = useContractRead(contract, "totalSupply");
  //const { data: name } = useContractRead(contract, "name");

  // Your smart contract address
  //const contractAddress = "0xA906EEf381Cf828f0F2Bfcc6e714a34Fd4e80399";

  useEffect(() => {
    async function testCommand() {
      //console.log(contract)
    }

    if (!initialized.current) {
      initialized.current = true
      //testCommand()
    }
  }, [])

  function getEth(hex) {
    //return <span>{ethers.utils.formatUnits(hex) * (10 ** 18)}</span>
    return <span>{ethers.utils.formatEther(hex)}</span>
  }

  function handleEvent(event) {
    let { transaction, eventName, data } = event
    let { transactionHash } = transaction
    let { trader, subject, ethAmount } = data
    //console.log(event)
    //console.log(transactionHash)
    return (
      <div key={transactionHash} style={{ width: '400px', height: '330px', border: '2px solid #000000', margin: '30px 10px' }}>
        <div style={{ padding: '5px 10px' }}>
          <p style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
            <span>{trader}</span>{"-->"}<span>{subject}</span>: {getEth(ethAmount._hex)}
          </p>
        </div>
        {/*<img style={{height: '300px', width:'300px'}} alt="pokemon" src={`https://img.pokemondb.net/artwork/large/${poke.name}.jpg`}/> */}
      </div>
    )
  }

  return (
    <div style={{ marginTop: '40px', justifyContent: 'space-around', display: 'flex', flexWrap: 'wrap', width: '90%', margin: 'auto' }}>
      <h1>Hello World</h1>
      <h2>{contractAddress}</h2>
      {trades?.map((event) => { return (handleEvent(event)) })}
      {/*<button onClick={go}>Test</button>*/}
      {/*totalSupply ? getTotalSupply() : <></>*/}
      {/*name ? <h2>{name}</h2> : <></>*/}
    </div>
  );
}

export default App;
