param([int]$Columns=4,[int]$Rows=3,[int]$CellWidth=360,[int]$CellHeight=360)
Add-Type -AssemblyName System.Drawing
$root=Resolve-Path (Join-Path $PSScriptRoot '..\..')
$manifest=Get-Content (Join-Path $PSScriptRoot 'manifest.json') -Raw | ConvertFrom-Json
$out=Join-Path $PSScriptRoot 'qa\contact-sheets'
New-Item -ItemType Directory -Force -Path $out | Out-Null
$jobs=@($manifest.jobs | Where-Object { Test-Path -LiteralPath (Join-Path $root ($_.url -replace '\.jpg$','.png')) })
$pageSize=$Columns*$Rows
for($offset=0;$offset -lt $jobs.Count;$offset+=$pageSize){
  $page=[int][Math]::Floor($offset/$pageSize)+1
  $canvas=[Drawing.Bitmap]::new($Columns*$CellWidth,$Rows*$CellHeight)
  $g=[Drawing.Graphics]::FromImage($canvas)
  $g.Clear([Drawing.Color]::FromArgb(24,23,22))
  $g.InterpolationMode=[Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $font=[Drawing.Font]::new('Segoe UI',10,[Drawing.FontStyle]::Bold)
  for($i=0;$i -lt $pageSize -and ($offset+$i) -lt $jobs.Count;$i++){
    $job=$jobs[$offset+$i]
    $file=Join-Path $root ($job.url -replace '\.jpg$','.png')
    $col=$i%$Columns;$row=[int][Math]::Floor($i/$Columns)
    $im=[Drawing.Image]::FromFile($file)
    $scale=[Math]::Min(($CellWidth-16)/$im.Width,($CellHeight-58)/$im.Height)
    $w=[int]($im.Width*$scale);$h=[int]($im.Height*$scale)
    $x=$col*$CellWidth+[int](($CellWidth-$w)/2);$y=$row*$CellHeight+8
    $g.DrawImage($im,$x,$y,$w,$h)
    $label='{0} {1:D3} {2}' -f $job.kind,([int]$job.index+1),$job.name
    if($label.Length -gt 43){$label=$label.Substring(0,40)+'...'}
    $g.DrawString($label,$font,[Drawing.Brushes]::White,$col*$CellWidth+8,($row+1)*$CellHeight-33)
    $im.Dispose()
  }
  $dest=Join-Path $out ('dracula-{0:D2}.jpg' -f $page)
  $canvas.Save($dest,[Drawing.Imaging.ImageFormat]::Jpeg)
  $font.Dispose();$g.Dispose();$canvas.Dispose()
  Write-Output $dest
}
