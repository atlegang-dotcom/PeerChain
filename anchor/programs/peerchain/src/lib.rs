use anchor_lang::prelude::*;

pub mod state;
use state::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod peerchain {
    use super::*;

    pub fn initialize_profile(ctx: Context<InitializeProfile>, name: String) -> Result<()> {
        let profile = &mut ctx.accounts.profile;
        profile.authority = ctx.accounts.authority.key();
        profile.name = name;
        profile.reputation = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeProfile<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 4 + 50 + 8)]
    pub profile: Account<'info, StudentProfile>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
