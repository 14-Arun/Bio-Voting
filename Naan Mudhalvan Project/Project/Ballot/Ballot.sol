// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BallotBox {
    // Define the owner of the contract (election authority).
    address public owner;

    // Define the structure of a voter.
    struct Voter {
        bytes32 biometricData;  // Encrypted biometric data
        bool hasVoted;          // Indicates if the voter has cast a vote
    }

    // Define the structure of a candidate.
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    // Define the election parameters.
    string public electionName;
    uint256 public registrationDeadline;
    uint256 public votingDeadline;

    // Store the list of candidates.
    Candidate[] public candidates;

    // Store the mapping of voters.
    mapping(address => Voter) public voters;

    // Event to announce when a vote is cast.
    event VoteCast(address indexed voter, uint256 candidateIndex);

    // Modifiers for access control.
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier canVote() {
        require(block.timestamp < votingDeadline, "Voting has ended.");
        require(block.timestamp < registrationDeadline, "Registration has ended.");
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        _;
    }

    // Constructor to initialize the contract.
    constructor(
        string memory _electionName,
        uint256 _registrationDeadline,
        uint256 _votingDeadline,
        string[] memory _candidateNames
    ) {
        owner = msg.sender;
        electionName = _electionName;
        registrationDeadline = _registrationDeadline;
        votingDeadline = _votingDeadline;
        
        // Initialize the list of candidates.
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
    }

    // Function to register a voter and store their encrypted biometric data.
    function registerVoter(bytes32 _encryptedBiometricData) public canVote {
        voters[msg.sender] = Voter({
            biometricData: _encryptedBiometricData,
            hasVoted: false
        });
    }

    // Function to cast a vote for a candidate.
    function castVote(uint256 _candidateIndex) public canVote {
        require(_candidateIndex < candidates.length, "Invalid candidate index.");
        require(voters[msg.sender].biometricData != 0, "You must register first.");

        // Mark the voter as having voted.
        voters[msg.sender].hasVoted = true;

        // Increment the candidate's vote count.
        candidates[_candidateIndex].voteCount++;

        // Emit a VoteCast event.
        emit VoteCast(msg.sender, _candidateIndex);
    }
}