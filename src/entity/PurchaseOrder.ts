import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PurchaseOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 256
    })
    poNumber: string;

    @Column("text")
    lineItem: string;

    @Column()
    quantity: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({
        length: 256
    })
    customerNumber: string;

    @Column({
        length: 256
    })
    paymentReference: string;

    @Column()
    isDeleted: boolean;
}

	