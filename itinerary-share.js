export function itineraryText({ plan, days, items, includeMaps = true }) {
  const byId = new Map(items.map(item => [item.id, item]));
  const lines = ['IBARRA VIVA · MI ITINERARIO', `${days} ${days === 1 ? 'día' : 'días'} para descubrir Ibarra, Ecuador.`, ''];
  for (let day = 1; day <= days; day++) {
    lines.push(`DÍA ${day}`, '────────────────────────');
    const stops = plan.filter(stop => stop.day === day && byId.has(stop.id));
    if (!stops.length) lines.push('Un día abierto a nuevas historias.');
    stops.forEach((stop, index) => {
      const item = byId.get(stop.id);
      lines.push(`${index + 1}. ${item.name}`, `   ${item.area}`);
      lines.push(`   ${item.type === 'food' ? item.specialty : item.type === 'sport' ? item.specialty + ' · ' + item.time + ' sugeridas' : 'Visita sugerida: ' + item.time}`);
      if (includeMaps) lines.push(`   https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.map)}`);
      lines.push('');
    });
    lines.push('');
  }
  lines.push('Ruta orientativa. Consulta horarios y accesos antes de salir.', 'Información turística: https://visitibarra.ec/');
  return lines.join('\n');
}

export function emailMessage({ plan, days, items, includeMaps = false }) {
  return `Hola,\n\nTe comparto mi itinerario por Ibarra.\n\n${itineraryText({ plan, days, items, includeMaps })}\n\n¡Nos vemos en Ibarra!`;
}

export function validRecipient(value) {
  const recipient = String(value || '').trim();
  if (recipient.length > 254 || /[\r\n]/.test(String(value))) return false;
  return /^[^\s@<>,;:"\\]+@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i.test(recipient);
}

export function emailDraft({ recipient, client = 'mailto', plan, days, items, includeMaps = false }) {
  if (!validRecipient(recipient)) throw new Error('Escribe una dirección de correo válida.');
  if (!['mailto', 'gmail', 'outlook'].includes(client)) throw new Error('Selecciona una opción de correo válida.');
  if (!plan.length) throw new Error('Añade al menos una parada antes de compartir el viaje.');
  const to = encodeURIComponent(recipient.trim());
  const subject = encodeURIComponent(`Mi itinerario de ${days} ${days === 1 ? 'día' : 'días'} por Ibarra`);
  const message = emailMessage({ plan, days, items, includeMaps });
  const body = encodeURIComponent(message.replace(/\r?\n/g, '\r\n'));
  const urls = {
    mailto: `mailto:${to}?subject=${subject}&body=${body}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
    outlook: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`,
  };
  return { url: urls[client], message, tooLong: urls[client].length > (client === 'mailto' ? 6000 : 8000) };
}
