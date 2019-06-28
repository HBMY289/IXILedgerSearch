var Converter = com.iota.iri.utils.Converter;
var Callable =  com.iota.iri.service.CallableRequest;
var Response =  com.iota.iri.service.dto.IXIResponse;
var ErrorResponse =  com.iota.iri.service.dto.ErrorResponse;
var tangle = IOTA.tangle;
/*
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "LedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "transaction"}' | jq '.'
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "LedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "tag"}' | jq '.'
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "LedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "bundle"}' | jq '.'
curl http://localhost:14265 -X POST -H 'X-IOTA-API-Version: 1' -H 'Content-Type: application/json'   -d '{"command": "LedgerSearch.findElementsStartingWith", "searchTrytes": "ABC", "type": "address"}' | jq '.'
*/

function getSearchTypeClass(type){

	var searchClass;
        switch (type){

        case 'tag':
                searchClass = com.iota.iri.model.persistables.Tag.class;
		break;
        case 'bundle':
                searchClass = com.iota.iri.model.persistables.Bundle.class;
		break;
        case 'transaction':
                searchClass = com.iota.iri.model.persistables.Transaction.class;
		break;
        case 'address':
                searchClass = com.iota.iri.model.persistables.Address.class;
		break;
        }
	return searchClass;

}

function findElementsStartingWith(request) {
        var searchTrytes = request.get('searchTrytes');
	var searchType = request.get('type');
        var trits = Converter.allocateTritsForTrytes(searchTrytes.length);
        Converter.trits(searchTrytes, trits,0);
        var bytes = Converter.allocateBytesForTrits(trits.length);
        Converter.bytes(trits, bytes);
        var findings = tangle.keysStartingWith (getSearchTypeClass(searchType), bytes);
        var resultsArray = findings.toArray();
        for (var i = 0; i < resultsArray.length; i++) {
           resultsArray[i] = resultsArray[i].toString();
        }
        var foundResults = resultsArray.length;
        return Response.create({
                trytes: searchTrytes,
		type: searchType,
                foundResults: foundResults,
                results: resultsArray,
        });
}

API.put("findElementsStartingWith", new Callable({ call: findElementsStartingWith }));
