import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { DangerousGoods } from '../../src/dangerous-goods/dangerous-goods.entity';

export class CreateDangerousGoodsTable1688162373042
  implements MigrationInterface
{
  defaultDangerousGoods: DangerousGoods[] = [
    new DangerousGoods({
      name: 'Explosives',
      UNClass: '1',
    }),
    new DangerousGoods({
      name: 'Gases',
      UNClass: '2',
    }),
    new DangerousGoods({
      name: 'Flammable liquid',
      UNClass: '3',
    }),
    new DangerousGoods({
      name: 'Flammable solids',
      UNClass: '4',
    }),
    new DangerousGoods({
      name: 'Oxidising substances',
      UNClass: '5',
    }),
    new DangerousGoods({
      name: 'Toxic substances',
      UNClass: '6',
    }),
    new DangerousGoods({
      name: 'Radioactive material',
      UNClass: '7',
    }),
    new DangerousGoods({
      name: 'Corrosive substances',
      UNClass: '8',
    }),
    new DangerousGoods({
      name: 'Miscellaneous dangerous goods',
      UNClass: '9',
    }),
  ];

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'dangerous_goods',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'uuid',
            type: 'uuid',
            isGenerated: true,
            generationStrategy: 'uuid',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'un_class',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    const dangerousGoodsRepository =
      queryRunner.manager.getRepository(DangerousGoods);

    for (const dangerousGoods of this.defaultDangerousGoods) {
      await dangerousGoodsRepository.save(dangerousGoods);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('dangerous_goods');
  }
}
