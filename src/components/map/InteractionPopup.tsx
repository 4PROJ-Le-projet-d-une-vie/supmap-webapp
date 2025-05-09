import type {Incident} from "../../utils/types.ts";

export default function InteractionPopup({ incident }: { incident: Incident }) {
    return (
        <div style={{
            maxWidth: '220px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '0.85rem',
            color: '#333'
        }}>
            <h4 style={{
                margin: '0 0 6px 0',
                fontSize: '1rem',
                color: '#2c3e50',
                textAlign: 'center'  // Centrer le texte du type
            }}>
                {incident.type.name}
            </h4>

            <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                    backgroundColor: '#e0f8e9',
                    border: '1px solid #2ecc71',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    textAlign: 'center',
                    flex: 1
                }}>
                    ✅ <strong>{incident.interactions_summary.is_still_present}</strong><br />
                    <span style={{ fontSize: '0.7rem', color: '#2ecc71' }}>Toujours là</span>
                </div>
                <div style={{
                    backgroundColor: '#ffe6e6',
                    border: '1px solid #e74c3c',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    textAlign: 'center',
                    flex: 1
                }}>
                    ❌ <strong>{incident.interactions_summary.no_still_present}</strong><br />
                    <span style={{ fontSize: '0.7rem', color: '#e74c3c' }}>Disparu</span>
                </div>
            </div>

            <p style={{
                margin: '6px 0 0 0',
                color: '#555',
                textAlign: 'center'  // Centrer le texte du handle et date
            }}>
            <span style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>
                <strong>{incident.user.handle}</strong> – {new Date(incident.created_at).toLocaleDateString('fr-FR')} {new Date(incident.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            </p>
        </div>
    )
}