require("dotenv").config();
import { map } from "rxjs/operators";
import { getApi$ } from ".";

const someName = "name";
changeName(someName).subscribe((result: any) => {
    console.log("length of call", result);
    process.exit(0);
});

function changeName(newName: string) {
    return getApi$().pipe(
        map((api, _) => {
            let submittable = api.tx.d9NodeVoting.changeCandidateName(newName)
            let txQuery = api.query.d9NodeVoting.changeCandidateName(newName);
            let method = submittable.method
            console.log("method ", method);
            console.log("method human", method.toHuman());
            return method.toU8a().length;
        }
        ),
    );
}


