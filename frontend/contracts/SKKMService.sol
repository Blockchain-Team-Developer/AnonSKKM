// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'contracts/SKKMNFT.sol';

contract SKKMService {
    address public owner;
    address public nftAddress;
    string public metadataURL;
    
    constructor(address _nftAddress){
        owner = msg.sender;
        nftAddress = _nftAddress;
    }
    
    modifier onlyOwner(){
        require(msg.sender == owner, "You are not Owner");
        _;
    }
    
    enum SKKM { IP, BM, OPK, PM }

    struct SKKM_request {
        address studentAddress;
        string studentName;
        string NIM;
        string namaKegiatan;
        string deskripsiKegiatan;
        SKKM jenisSKKM;
    }
    
    struct request_history{
        address studentAddress;
        string studentName;
        string NIM;
        string namaKegiatan;
        string deskripsiKegiatan;
        SKKM jenisSKKM;
        bool approved;
    }
    
    SKKM_request[] public SKKM_requests_list;
    
    request_history[] public SKKM_requests_history;
    
    function requestSKKM(
        string memory _studentName,
        string memory _NIM,
        string memory _namaKegiatan,
        string memory _deskripsiKegiatan,
        SKKM _jenisSKKM) 
        public returns(string memory message){
        
        SKKM_request memory temp_struct;
        
        temp_struct.studentAddress = msg.sender;
        temp_struct.studentName = _studentName;
        temp_struct.NIM = _NIM;
        temp_struct.namaKegiatan = _namaKegiatan;
        temp_struct.deskripsiKegiatan = _deskripsiKegiatan;
        temp_struct.jenisSKKM = _jenisSKKM;
        
        SKKM_requests_list.push(temp_struct);
        
        return "Request telah disubmit, silahkan menunggu approval dari Admin";
    }
    
    
    function approveSKKM(uint _index, bool _approved, string memory _metadataURL) public onlyOwner{
        SKKMNFT skkmNFT = SKKMNFT(nftAddress);

        request_history memory temp_struct;
        
        temp_struct.studentAddress = SKKM_requests_list[_index].studentAddress;
        temp_struct.studentName = SKKM_requests_list[_index].studentName;
        temp_struct.NIM = SKKM_requests_list[_index].NIM;
        temp_struct.namaKegiatan = SKKM_requests_list[_index].namaKegiatan;
        temp_struct.deskripsiKegiatan = SKKM_requests_list[_index].deskripsiKegiatan;
        temp_struct.jenisSKKM = SKKM_requests_list[_index].jenisSKKM;
        temp_struct.approved = _approved;
        
        SKKM_requests_history.push(temp_struct);
        skkmNFT.mintNFT(SKKM_requests_list[_index].studentAddress, _metadataURL);
        
        for (uint i = _index; i < SKKM_requests_list.length - 1; i++) {
            SKKM_requests_list[i] = SKKM_requests_list[i + 1];
        }
        
        delete SKKM_requests_list[SKKM_requests_list.length - 1];
        
        SKKM_requests_list.pop();
    }

}