export class StaticData {
    static get bootstrapData() {
        let retval = new Object();
        let branches = [
            {
                "id": "1",
                "name": "Warren, NJ"
            },
            {
                "id": "2",
                "name": "Mt. Laurel, NJ"
            },
            {
                "id": "3",
                "name": "Chalfont, PA"
            },
            {
                "id": "4",
                "name": "Manhattan, NY"
            },
            {
                "id": "5",
                "name": "Hauppauge, NY"
            },
            {
                "id": "6",
                "name": "Albany, NY"
            },
            {
                "id": "7",
                "name": "Boston, MA"
            },
            {
                "id": "8",
                "name": "Southborough, MA"
            },
        ];

        let companies = [
            {
                "id": "1",
                "name": "Control Point"
            }
        ];

        companies[0].branches = branches;



        return retval;
    }
}