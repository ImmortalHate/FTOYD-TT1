"use client";
import React, { useState } from "react";
import "./MatchCards.styl";
import { Match } from "../../store/api";

function SummaryItem({ label, value }: { label: string; value: number | string }) {
  const displayValue = label.trim().toLowerCase() === "points:" ? `+${value}` : value;
  return (
    <div className="summary-item">
      <div className="summary-item__content">
        <span className="summary-item__label">{label}</span>
        <span className="summary-item__value">{displayValue}</span>
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(prev => !prev);
  const placeholderLogo = "/logos/placeholder.png";
  const playerAvatarPlaceholder = "/logos/player.png";
  const rawStatus = match.status.toLowerCase();
  let normalizedStatus = "";
  if (rawStatus.includes("ongoing")) normalizedStatus = "ongoing";
  else if (rawStatus.includes("schedul")) normalizedStatus = "scheduled";
  else if (rawStatus.includes("finish")) normalizedStatus = "finished";
  else normalizedStatus = rawStatus;
  const statusMapping: Record<string, { display: string; class: string }> = {
    ongoing: { display: "Live", class: "live" },
    scheduled: { display: "Match preparing", class: "match-preparing" },
    finished: { display: "Finished", class: "finished" }
  };
  const statusInfo = statusMapping[normalizedStatus] || { display: match.status, class: rawStatus };
  const displayScore = normalizedStatus === "scheduled" ? "0:0" : `${match.homeScore}:${match.awayScore}`;
  const homePoints = normalizedStatus === "scheduled" ? 0 : match.homeTeam.points;
  const homePlace = normalizedStatus === "scheduled" ? 0 : match.homeTeam.place;
  const homeTotalKills = normalizedStatus === "scheduled" ? 0 : match.homeTeam.total_kills;
  const awayPoints = normalizedStatus === "scheduled" ? 0 : match.awayTeam.points;
  const awayPlace = normalizedStatus === "scheduled" ? 0 : match.awayTeam.place;
  const awayTotalKills = normalizedStatus === "scheduled" ? 0 : match.awayTeam.total_kills;

  return (
    <div className="match-card" onClick={toggleExpand}>
      <div className="match-card__content">
        <div className="match-card__team match-card__team--left">
          <img src={placeholderLogo} alt={match.homeTeam.name} className="match-card__logo" />
          <span className="match-card__name">{match.homeTeam.name}</span>
        </div>
        <div className="match-card__center">
          <span className="match-card__score">{displayScore}</span>
          <span className={`match-card__status match-card__status--${statusInfo.class}`}>
            {statusInfo.display}
          </span>
        </div>
        <div className="match-card__team match-card__team--right">
          <span className="match-card__name">{match.awayTeam.name}</span>
          <img src={placeholderLogo} alt={match.awayTeam.name} className="match-card__logo" />
        </div>
        <img
          src="matchCards/switch.svg"
          alt="toggle details"
          className={`match-card__arrow ${expanded ? "expanded" : ""}`}
        />
      </div>
      <div className={`match-card__details ${expanded ? "expanded" : ""}`}>
        <div className="match-card__details-team">
          <div className="match-card__players">
            {match.homeTeam.players.map((player, idx) => (
              <div key={idx} className="match-card__player">
                <img
                  src={playerAvatarPlaceholder}
                  alt={player.username}
                  className="match-card__player-avatar"
                />
                <span className="match-card__player-name">{player.username}</span>
                <span className="match-card__player-kills">
                  <span className="player-kills__label">Убийств: </span>
                  <span className="player-kills__value">
                    {normalizedStatus === "scheduled" ? 0 : player.kills}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="match-card__summary">
            <SummaryItem label="Points:" value={homePoints} />
            <img src="matchCards/divider.svg" alt="divider" className="summary-separator" />
            <SummaryItem label="Место:" value={homePlace} />
            <img src="matchCards/divider.svg" alt="divider" className="summary-separator" />
            <SummaryItem label="Всего убийств:" value={homeTotalKills} />
          </div>
        </div>
        <div className="match-card__details-team">
          <div className="match-card__players">
            {match.awayTeam.players.map((player, idx) => (
              <div key={idx} className="match-card__player">
                <img
                  src={playerAvatarPlaceholder}
                  alt={player.username}
                  className="match-card__player-avatar"
                />
                <span className="match-card__player-name">{player.username}</span>
                <span className="match-card__player-kills">
                  <span className="player-kills__label">Убийств: </span>
                  <span className="player-kills__value">
                    {normalizedStatus === "scheduled" ? 0 : player.kills}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="match-card__summary">
            <SummaryItem label="Points:" value={awayPoints} />
            <img src="matchCards/divider.svg" alt="divider" className="summary-separator" />
            <SummaryItem label="Место:" value={awayPlace} />
            <img src="matchCards/divider.svg" alt="divider" className="summary-separator" />
            <SummaryItem label="Всего убийств:" value={awayTotalKills} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatchCards({ matches }: { matches: Match[] }) {
  return (
    <div className="match-cards-wrapper">
      {matches.map((match, idx) => (
        <MatchCard key={idx} match={match} />
      ))}
    </div>
  );
}
