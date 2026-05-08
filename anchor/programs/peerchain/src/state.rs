use anchor_lang::prelude::*;

#[account]
pub struct StudentProfile {
    pub authority: Pubkey,
    pub name: String,
    pub reputation: u64,
}

#[account]
pub struct StudySession {
    pub student: Pubkey,
    pub mentor: Pubkey,
    pub duration: i64,
    pub completed: bool,
}
