import db from "../../models"
import * as sequelize from "sequelize";

class PessoaService {
    private db: sequelize.Sequelize;

    constructor() {
        this.db = db.sequelize;
    }

    public async getPessoaFisicaByCPF(cpf: string | null = null): Promise<any> {

        cpf = cpf ? cpf.toString().replace(/[^0-9]+/g, '') : null;

        if (!cpf || cpf.length !== 11) {
            return {
                success: false,
                message: 'É necessário informar um CPF válido.'
            }
        }

        try {
            const response: object[] = await this.db.query(`select *
                        from cadastro.pessoas pp
                                 inner join cadastro.pessoa_fisica pf on pp.codpessoa = pf.codpessoa and pf.cpf = $cpf
                                 inner join cadastro.clientes cl on pf.codpessoa = cl.codpessoa`,
                {
                    bind: {cpf},
                    type: sequelize.QueryTypes.SELECT
                });

            if (response.length === 0) {
                throw Error('Não foí encontrando registro para o CPF informado.');
            }

            return {
                success: true,
                data: response[0]
            }
        } catch (e) {
            return {
                success: false,
                message: e.message || 'Não foi possível encontrar o registro.',
                error: e
            }
        }
    }


    public async getPessoaJuridicaByCNPJ(cnpj: string | null = null): Promise<any> {

        cnpj = cnpj ? cnpj.toString().replace(/[^0-9]+/g, '') : null;

        if (!cnpj || cnpj.length !== 14) {
            return {
                success: false,
                message: 'É necessário informar um CNPJ válido.'
            }
        }

        try {
            const response: object[] = await this.db.query(`select pp.codpessoa
                            from cadastro.pessoas pp
                                     inner join cadastro.pessoa_juridica pj on pp.codpessoa = pj.codpessoa and pj.cnpj = $cnpj
                                     inner join cadastro.clientes cl on pj.codpessoa = cl.codpessoa`,
                {
                    bind: {cnpj},
                    type: sequelize.QueryTypes.SELECT
                });

            if (response.length === 0) {
                throw Error('Não foí encontrando registro para o CNPJ informado.');
            }

            return {
                success: true,
                data: response[0]
            }
        } catch (e) {
            return {
                success: false,
                message: e.message || 'Não foi possível encontrar o registro.',
                error: e
            }
        }
    }
}

export default new PessoaService();
