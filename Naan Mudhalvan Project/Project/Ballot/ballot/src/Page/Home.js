import React, { useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { contract } from "./connector";

function Home() {
   const [Wallet, setWallet] = useState("");
   
   const [CandidateIndex, setCandidateIndex] = useState("");

   const [VoterData, setVoterData] = useState("");

   const [CandidateIndexed, setCandidateIndexed] = useState("");

   const [CandidatesData, setCandidatesData] = useState("");

   const [RegDeadline, setRegDeadlne] = useState("");

   const [VoteDeadlne, setVoteDeadlne] = useState("");

   const [Election, setElection] = useState("");

   
   


   const handleCandidateIndex = (e) => {
      setCandidateIndex(e.target.value)
   }


   const handleCastVote = async () => {
      try {
         let tx = await contract.castVote(CandidateIndex.toString())

         let wait = await tx.wait()
         console.log(wait);
         alert(wait.transactionHash)
      } catch (error) {
         alert(error)   
      }
   }


   const handleVoterBiometricData = (e) => {
      setVoterData(e.target.value)
   }
   

   const handleRegisterVoter = async () => {
      try {
         let tx = await contract.registerVoter(VoterData)
         let wait = await tx.wait()
         console.log(wait)
         alert(wait.transactionHash)
         
      } catch (error) {
         alert(error)
      }
   }


   const handleCandidateIndexs = (e) => {
      setCandidateIndexed(e.target.value)
   }

   const handleCandidate = async () => {
      try {
         let tx = await contract.candidates(CandidateIndexed.toString())
         setCandidatesData(tx)
         console.log(tx);
         // alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }

   const handleRegdeadline = async () => {
      try {
         let tx = await contract.registrationDeadline()
         setRegDeadlne(tx)
         console.log(tx);
         // alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }
   
   const handleVoteDeadline = async () => {
      try {
         let tx = await contract.votingDeadline()
         setVoteDeadlne(tx)
         console.log(tx);
         // alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }
   
   const handleElecName = async () => {
      try {
         let tx = await contract.electionName()
         setElection(tx)
         console.log(tx);
         // alert(wait.transactionHash)
      } catch (error) {
         alert(error)
      }
   }
   

   const handleWallet = async () => {
      if (!window.ethereum) {
         return alert('please install metamask');
      }

      const addr = await window.ethereum.request({
         method: 'eth_requestAccounts',
      });

      setWallet(addr[0])

   }

 return (
  <div>
   <h1 style={{ marginTop: "30px", marginBottom: "80px" }}>Ballot Box on Blockchain</h1>
       {!Wallet ?

          <Button onClick={handleWallet} style={{ marginTop: "30px", marginBottom: "50px" }}>Connect Wallet </Button>
          :
          <p style={{ width: "250px", height: "50px", margin: "auto", marginBottom: "50px", border: '2px solid #2096f3' }}>{Wallet.slice(0, 6)}....{Wallet.slice(-6)}</p>
       }
   <Container>
    <Row>



     <Col style={{marginRight:"100px"}}>
      <div>
   
      <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleCandidateIndex} type="number" placeholder="Candidate Index" value={CandidateIndex} /> <br />
      <Button onClick={handleCastVote} style={{ marginTop: "10px" }} variant="primary">Cast Vote</Button>

      </div>
     </Col>

      <Col style={{ marginRight: "100px" }}>
         <div>
            <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleVoterBiometricData} type="string" placeholder="Vote Encripted data" value={VoterData} /> <br />
            <Button onClick={handleRegisterVoter} style={{ marginTop: "10px" }} variant="primary">Register Voter</Button>
  
         </div>
      </Col> 
           
               
   </Row>    
   <Row style={{marginTop:"100px"}}>
               <Col style={{ marginRight: "100px" }}>
                  <div>
                   <input style={{ marginTop: "10px", borderRadius: "5px" }} onChange={handleCandidateIndexs} type="number" placeholder="Candidate Index" value={CandidateIndexed} /> <br />
                     <Button onClick={handleCandidate} style={{ marginTop: "10px" }} variant="primary">  Get transaction Count</Button>
                   {CandidatesData ? CandidatesData?.map(e => <p>{e.toString()}</p>) : <p></p>
                     }
                  </div>
               </Col> 


               <Col style={{ marginRight: "100px" }}>
                  <div>
                   <Button onClick={handleRegdeadline} style={{ marginTop: "10px" }} variant="primary">Registration deadline</Button>
                   {RegDeadline ? <p>{RegDeadline.toString()}</p> : <p></p>}
                     
                     
                  </div>
               </Col>

             
       </Row>
          <Row style={{ marginTop: "50px" }}>
             <Col style={{ marginRight: "100px" }}>
                <div>
                   <Button onClick={handleVoteDeadline} style={{ marginTop: "10px" }} variant="primary">Voting deadline</Button>
                   {VoteDeadlne ? <p>{VoteDeadlne.toString()}</p> : <p></p>}


                </div>
             </Col>

             <Col style={{ marginRight: "100px" }}>
                <div>
                   <Button onClick={handleElecName} style={{ marginTop: "10px" }} variant="primary">Election Name</Button>
                   {Election ? <p>{Election.toString()}</p> : <p></p>}


                </div>
             </Col>
   </Row>
   </Container>

  </div>
 )
}

export default Home;
