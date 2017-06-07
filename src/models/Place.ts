import {Entity, Field}  from 'hydrate-mongodb';

@Entity()
export class Place {

    @Field()
    public code: string;

    @Field()
    public settlement: string;

    @Field()
    public settlementType: string;

    @Field()
    public municipality: string;

    @Field()
    public state: string;

    @Field()
    public city: string;

    @Field()
    public postalCode: string;

    @Field()
    public officeCode: string;

    @Field()
    public cCp: string;

    @Field()
    public cSettlementType: string;

    @Field()
    public idSettlementCPCons: string;

    @Field()
    public zone: string;

    @Field()
    public cCity: string;

    /**
     * @param data
     */
    public constructor(data: Array<string> | object) {
        if (data instanceof Array) {
            this.code = data[0];
            this.settlement =  data[1];
            this.settlementType = data[2];
            this.municipality = data[3];
            this.state = data[4];
            this.city = data[5];
            this.postalCode = data[6];
            this.officeCode = data[7];
            this.cCp = data[8];
            this.cSettlementType = data[9];
            this.idSettlementCPCons = data[10];
            this.settlementType = data[11];
            this.zone = data[12];
            this.cCity = data[13];
        }
    }
}
