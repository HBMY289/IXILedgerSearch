# LedgerSearch

Copy source code into your `ixi` directory such that it can be found as `ixi/LedgerSearch`. 
Alternatively, naivate to your IRI ixi diretory and  clone the repository with
```
git clone https://github.com/HBMY289/IXILedgerSearch.git
```


Your node may be running at this time, and it will hot-load the script. 
After you've cloned it, and with a running iri node, run the following command to get results for partly matching entries in the databas:


Assuming your IRI port is 14265 you then can

search for transaction hashes starting with "ABC" with:
```
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "IXILedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "transaction"}' | jq '.'
```
search for tags starting with "ABC" with :
```
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "IXILedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "tag"}' | jq '.'
```
search for bundle hashes starting with "ABC" with:
```
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "IXILedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "bundle"}' | jq '.'
```
search for addresses starting with "ABC" with:
```
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "IXILedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "address"}' | jq '.'

```

